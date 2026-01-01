const Web3 = require('web3');
const contractABI = [/* ABI here */];
const contractAddress = "0xYourContractAddress";

const web3 = new Web3("http://localhost:8545");
const contract = new web3.eth.Contract(contractABI, contractAddress);

const updateConstituency = async (voterId, newConst, fromAddress) => {
    await contract.methods.updateConstituency(voterId, newConst).send({ from: fromAddress });
};

// Example usage
(async () => {
    try {
        await updateConstituency("V123", "Delhi-North", "0xYourAccount");
        console.log("✅ Constituency updated successfully!");
    } catch (err) {
        console.error("❌ Error:", err);
    }
})();
