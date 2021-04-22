const Migrations = artifacts.require("Migrations");
const M4xToken = artifacts.require("M4xToken");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(M4xToken);
  deployer.deploy(MarketPlace);
};
