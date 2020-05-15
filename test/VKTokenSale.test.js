const VKToken = artifacts.require("VKToken.sol");
const VKTokenSale = artifacts.require("VKTokenSale.sol");

const chai = require("./chai/settings");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("VKTokenSale", async (accounts) => {
    const [initialHolder, recipient, anotherAccount] = accounts;

    it("there shouldnt be any coins in my account", async () => {
        let instance = await VKToken.deployed();
        expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all coins should be in the VKTokenSale smart contract", async () => {
        let instance = await VKToken.deployed();
        let balance = await instance.balanceOf(VKTokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await VKToken.deployed();
        let tokenSaleInstance = await VKTokenSale.deployed();
        let balanceBeforeAccount = await tokenInstance.balanceOf(recipient);

        expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf(recipient));
    });
})