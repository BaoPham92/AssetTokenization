pragma solidity ^0.6.0;

import "./CrowdSale.sol";


contract VKTokenSale is Crowdsale {
    constructor(uint256 rate, address payable wallet, IERC20 token)
        public
        Crowdsale(rate, wallet, token){
            
        }
}
