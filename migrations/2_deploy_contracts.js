const VKToken = artifacts.require("VKToken.sol");

module.exports = async (deployer) => await deployer.deploy(VKToken, 1000000000);