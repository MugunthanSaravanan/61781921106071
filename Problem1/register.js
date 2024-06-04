const axios = require('axios');

async function registerCompany() {
    const registrationData = {
        companyName: "Unique",
        ownerName: "Mugunthan",
        rollNo: "71",
        ownerEmail: "mugunthansaravanan07@gmail.com",
        accessCode: "wdIhGO"
    };

    try {
        const response = await axios.post('http://20.244.56.144/test/register', registrationData);
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error registering the company:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error in request setup:', error.message);
        }
    }
}

registerCompany();
