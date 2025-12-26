const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';
const testUser = {
  username: 'testuser_' + Date.now(),
  email: 'test_' + Date.now() + '@example.com',
  password: 'password123'
};

async function testAuth() {
  try {
    console.log('Testing Signup...');
    const signupRes = await axios.post(`${API_URL}/signup`, testUser);
    console.log('Signup Status:', signupRes.status, signupRes.data);

    console.log('Testing Login...');
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Login Status:', loginRes.status, loginRes.data);
    
  } catch (error) {
    console.error('Test Failed:', error.response ? error.response.data : error.message);
  }
}

testAuth();
