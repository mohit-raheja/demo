export const fetchCustomers = jest.fn(() => Promise.resolve([
    { firstName: 'Mohit', lastName: 'Raheja', dob: '2000-01-01' },
    { firstName: 'Ansh', lastName: 'Raheja', dob: '1999-12-31' }
  ]));
  
  export const addCustomer = jest.fn((customer) => Promise.resolve(customer));
  