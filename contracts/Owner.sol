contract Owner {
   address private _owner;

    constructor () {
        _owner = msg.sender;
    }

   modifier onlyOwner {
      require(msg.sender == _owner, "only the owner is allowed to access this function");
      _;
   }
}