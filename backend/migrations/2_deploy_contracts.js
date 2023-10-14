const MicroLending = artifacts.require("MicroLending");

module.exports = function(deployer) {
  deployer.deploy(MicroLending);
};
