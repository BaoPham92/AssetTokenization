const VKToken = artifacts.require("VKToken.sol");
const VKTokenSale = artifacts.require("VKTokenSale.sol");

module.exports = async (deployer) => {
    let addr = await web3.eth.getAccounts();
    let VKInstance = await VKToken.deployed();

    await deployer.deploy(VKToken, 1000000000);
    await deployer.deploy(VKTokenSale, 1, addr[0], VKToken.address);
    await VKInstance.transfer(VKTokenSale.address, 1000000000);
};