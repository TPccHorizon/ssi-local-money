pragma solidity ^0.5.0;

import "./ERC20.sol";

//needed?
/*abstract contract ER20 {
    function totalSupply() virtual public view returns (uint256);
    function balanceOf(address _owner) virtual public view returns (uint256 balance);
    function transfer(address _to, uint _value) virtual public returns (bool success);
    event Transfer(address indexed _from, address indexed _to, uint _value);
}*/

contract ti8mToken is ERC20 {
    string public constant name = "ti&m Token";
    string public constant symbol = "TI8M";

    mapping (address => uint) balances;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner allowed");
        _;
    }    

    constructor(uint256 _initialSupply) public {
        owner = msg.sender;
        _mint(msg.sender, _initialSupply);

        //Ansatz mit überweisung an Sender
        //balances[msg.sender] = 1000;
        //emit Transfer(address(0), msg.sender, 1000);
    }
/*
    function totalSupply() override public pure returns (uint256) {
        return 1000;
    }
*/
    function etherBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function modifyTotalSupply(int256 _value) public onlyOwner returns (uint256 New_totalSupply) {
        uint256 absValue;
        if(_value<0) {
            absValue = uint256(_value);
            _burn(msg.sender, absValue);
        } else {
            absValue = uint256(_value);
            _mint(msg.sender, absValue);
        }
        return totalSupply(); //where is total supply defined?
    }

    //add user to a list -> so only users in this list are allowed to transfer money?
    function initialTransfer(address _to, uint256 _value) public onlyOwner returns (bool success) {
        require(_to != msg.sender, 'do you owe yourself money?');
        require(_value > 0, 'try a bit higher');
        require(balanceOf(msg.sender) >= _value, 'try to mint first some more');
        super.transfer(_to, _value);
        return true;
    }



    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != msg.sender, 'do you owe yourself money?');
        require(super.balanceOf(msg.sender) >= _value, 'not enough money in your account');
        require(_value > 0, 'try a bit higher');
        //require(msg.sender != owner, 'use initialTransfer your the owner!');
        super.transfer(_to, _value);
        return true;
    }

    function changeOwner(address _newOwner) public onlyOwner returns (bool) {
        uint256 ownerBalance= balanceOf(owner);
        super.transfer(_newOwner, ownerBalance);
        owner=  _newOwner;
        return true;
    }
}


/*    function balanceOf(address _owner) override public view returns (uint256) {
        return balances[_owner];
    }
*/