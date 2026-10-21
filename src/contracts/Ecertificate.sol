pragma solidity ^0.5.0;


contract Ecertificate {
   string public name = 'Ecertificate';
   mapping (uint => Certificate) public certificateData;

   struct Certificate {
       string cId;
       uint256 sId;
       string sName;
       string cType;
       string department;
   }

   uint public counter;

   constructor() public {
     
   }

   function addCertificate(string calldata  _cId, uint256  _sId, string calldata _sName, string calldata _cType, string calldata _department) external {
       counter++;
       certificateData[counter] = Certificate(_cId , _sId , _sName, _cType, _department);
   }
}