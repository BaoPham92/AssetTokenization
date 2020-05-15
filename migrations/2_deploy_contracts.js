const VKToken = artifacts.require("VKToken.sol");
const VKTokenSale = artifacts.require("VKTokenSale.sol");

module.exports = async (deployer) => {
    //  * RETREIVE ACCOUNTS
    let addr = await web3.eth.getAccounts();

    // ! DEPLOY CONTRACTS FIRST BEFORE INSTANCE INTERACTIPON
    await deployer.deploy(VKToken, 1000000000);
    await deployer.deploy(VKTokenSale, 1, addr[0], VKToken.address);

    // * THEN DECLARE DEPLOYED INSTANCE
    let VKInstance = await VKToken.deployed();
    await VKInstance.transfer(VKTokenSale.address, 1000000000);
};