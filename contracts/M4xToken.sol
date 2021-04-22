pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract M4xToken is ERC20 {
    constructor() ERC20("M4xToken", "M4X"){
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}