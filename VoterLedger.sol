// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoterLedger {
    struct Voter {
        string voterHash; // SHA-256 of Voter ID + Biometric Hash
        string currentConstituency;
        bool isActive;
    }

    mapping(string => Voter) public voters;

    function registerVoter(string memory _id, string memory _hash, string memory _const) public {
        require(!voters[_id].isActive, "Voter already registered");
        voters[_id] = Voter(_hash, _const, true);
    }

    function updateConstituency(string memory _id, string memory _newConst) public {
        require(voters[_id].isActive, "Voter not found");
        voters[_id].currentConstituency = _newConst;
    }
}