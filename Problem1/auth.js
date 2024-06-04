import('node-fetch').then(module => {
    const fetch = module.default;

    async function generateToken() {
    const authData = 
        {
        companyName: 'Unique',
        clientID: 'ab8e9f79-d40d-4e54-b718-8ba9a0592d8c',
        clientSecret: 'UUBWVadBxuWZWlzN',
        ownerName: 'Mugunthan',
        ownerEmail: 'mugunthansaravanan07@gmail.com',
        rollNo: '71'
      };

    try {
        console.log('Sending request to generate token...');
        const response = await fetch('http://20.244.56.144/test/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
        });

        if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response status text:', response.statusText);
        const errorText = await response.text();
        console.log('Error response text:', errorText);
        throw new Error('Failed to generate token: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Generated token:', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error('Error generating token:', error);
    }
    }

    generateToken();
});