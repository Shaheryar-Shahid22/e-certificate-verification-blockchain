const DStorage = artifacts.require("DStorage");
const Ecertificate = artifacts.require("Ecertificate");

module.exports = function(deployer) {
  deployer.deploy(DStorage);
  deployer.deploy(Ecertificate);
};
