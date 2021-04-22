import Web3 from "web3";
// import ComplexStorage from "./contracts/ComplexStorage.json";
// import SimpleStorage from "./contracts/SimpleStorage.json";
// import TutorialToken from "./contracts/TutorialToken.json";
import Migrations from "./contracts/Migrations.json";
import M4xToken from "./contracts/M4xToken.json";
import MarketPlace from "./contracts/MarketPlace.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:9545"),
  },
  contracts: [M4xToken, Migrations, MarketPlace]
};

export default options;
