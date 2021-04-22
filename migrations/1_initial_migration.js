const Migrations = artifacts.require("Migrations");
const M4xToken = artifacts.require("M4xToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(M4xToken);
};
