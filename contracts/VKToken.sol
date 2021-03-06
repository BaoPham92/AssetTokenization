// * ERC20 Token Contract
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";


contract VKToken is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply)
        public
        ERC20Detailed("Versed Kode Token", "VKT", 0) {
            _mint(msg.sender, initialSupply);
        }
}
