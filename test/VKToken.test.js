const VKToken = artifacts.require("VKToken.sol");
const chai = require("./chai/settings");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("VKToken", async (accounts) => {
    const [initialHolder, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.mainToken = await VKToken.new(1000);
    })
    
    it("All tokens should be in accounts.", async () => {
        let instance = this.mainToken;
        let totalSupply = await instance.totalSupply();

        // * INITIAL ADDRESS TO BE === TOTALSUPPLY FROM SMART CONTRACT
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("Able to send tokens from Account 1 to Account 2", async () => {
        let instance = this.mainToken;
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, 1)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(1)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(1));
    });

    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = this.mainToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);

        expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
})