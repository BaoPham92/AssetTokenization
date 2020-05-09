const VKToken = artifacts.require("VKToken.sol");
const chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
chai.use(chaiBN);
chai.use(chaiAsPromised);

contract("VKToken", async (accounts) => {
    const [initialHolder, recipients, anotherAccount] = accounts;

    it("All tokens should be in accounts.", async () => {
        let instance = await VKToken.deployed();
        let totalSupply = await instance.totalSupply();

        // * INITIAL ADDRESS TO BE === TOTALSUPPLY FROM SMART CONTRACT
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    })
})