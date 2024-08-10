import axios from 'axios';

const API_URL = 'http://localhost:8080/api/customers';

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    throw error;
  }
};

export const addCustomer = async (customer: {
  firstName: string;
  lastName: string;
  dob: string;
}) => {
  try {
    const response = await axios.post(API_URL, customer);
    return response.data;
  } catch (error) {
    console.error('Failed to add customer:', error);
    throw error;
  }
};
