const axios = require('axios');

const getDigiLockerAddress = async (accessToken) => {
    const response = await axios.get('https://api.digitallocker.gov.in/v1/user/details', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data.address;
};

// Example usage
getDigiLockerAddress("your_access_token_here").then(address => {
    console.log("Fetched Address:", address);
    // Trigger updateConstituency on Smart Contract via Web3.js
});
