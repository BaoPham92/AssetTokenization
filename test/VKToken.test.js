const VKToken = artifacts.require("VKToken.sol");
const chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
chai.use(chaiBN);
chai.use(chaiAsPromised);

contract("VKToken", async (accounts) => {
    const [initialHolder, recipient, anotherAccount] = accounts;

    it("All tokens should be in accounts.", async () => {
        let instance = await VKToken.deployed();
        let totalSupply = await instance.totalSupply();

        // * INITIAL ADDRESS TO BE === TOTALSUPPLY FROM SMART CONTRACT
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("Able to send tokens from Account 1 to Account 2", async () => {
        let instance = await VKToken.deployed();
        let totalSupply = await instance.totalSupply(); 

        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, 1)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(1)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(1));
    });

    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = await VKToken.deployed();
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        
        expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to.eventually.be.rejected;
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
})