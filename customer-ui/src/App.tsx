import React, { useState, useEffect } from 'react';
import { fetchCustomers, addCustomer } from './apiUtils/api';
import Customer from './components/Customer';
import { format } from 'date-fns';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<{ firstName: string; lastName: string; dob: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        setError('Error fetching customers');
        console.error('Error fetching customers:', error);
      }
    };

    loadCustomers();
  }, []);

  const handleAddCustomer = async (customer: { firstName: string; lastName: string; dob: string }) => {
    try {
      const newCustomer = await addCustomer(customer);
      setCustomers([...customers, newCustomer]);
    } catch (error) {
      setError('Error adding customer');
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <Customer onAddCustomer={handleAddCustomer} />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <div>
        <h2>Customer List</h2>
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              {customer.firstName} {customer.lastName} - {format(new Date(customer.dob), 'dd-MM-yyyy')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
