// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owner.sol";

contract MarketPlace is Owner{    
    enum Status{ PENDING, SHIPPED, DELIVERED }

    event StatusChanged(Status status);

   struct Item {
       string name;
       Status status;
       address payable deliveryMan;
       address customer;
   }

   address payable addressDeliveryMan = payable(0xc71fDbDE4938D7605528FD998a7a5F5420eAbB6A);

   Item[4] listItems;

     // Init our marketplace with 4 items
   constructor() {
     listItems[0] = Item("Renault", Status.PENDING, addressDeliveryMan, address(0));
     listItems[1] = Item("Audi", Status.PENDING, addressDeliveryMan, address(0));
     listItems[2] = Item("BMW", Status.PENDING, addressDeliveryMan, address(0));
     listItems[3] = Item("Fiat", Status.PENDING, addressDeliveryMan, address(0));
   }

     // Get item owned by given address
   function getItem(address _customer) external view returns (Item memory) {
        Item memory res;
        for (uint i=0; i < 4; i++){
          if(listItems[i].customer != address(0) && listItems[i].customer == _customer){
               res = listItems[i];
          }
        }
        return res;
   }
     // Specify an account in order to buy an item (different from msg.send for testing purpose)
   function buy(uint _itemIndex, address _customer) external {
        listItems[_itemIndex].customer = _customer;
   }

     // Only owner of marketplace can start shipment
   function ship(uint _itemIndex) external onlyOwner(){
        require(listItems[_itemIndex].status == Status.PENDING, "l'item est deja partis");
        listItems[_itemIndex].status = Status.SHIPPED;
        emit StatusChanged(Status.SHIPPED);
   }
     // Only owner of marketplace can start set stats to delivered
   function delivered(uint _itemIndex) external onlyOwner(){
        require(listItems[_itemIndex].status == Status.SHIPPED, "l'item est pas encore en livraison");
        listItems[_itemIndex].status = Status.DELIVERED;
        emit StatusChanged(Status.DELIVERED);
   }
     // Tip the delivery man
   function tip(uint _itemIndex) payable external{
        require(listItems[_itemIndex].status == Status.DELIVERED, "l'item n'est pas encore arrive");
        listItems[_itemIndex].deliveryMan.transfer(msg.value);
   }
}
