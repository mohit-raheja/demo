import React, { useState, useEffect } from 'react';
import { fetchCustomers, addCustomer } from './apiUtils/api';
import Customer from './components/Customer';
import { format } from 'date-fns';
import './App.css';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<{ firstName: string; lastName: string; dob: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

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

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="app-container">
      <h1>Customer Management</h1>
      <Customer onAddCustomer={handleAddCustomer} />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <div className="customer-list">
        <h2>Customer List</h2>
        <ul>
          {currentCustomers.map((customer, index) => (
            <li key={index}>
              {customer.firstName} {customer.lastName} - {format(new Date(customer.dob), 'dd-MM-yyyy')}
            </li>
          ))}
        </ul>
        {currentCustomers.length>0 && (<div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>)}
      </div>
    </div>
  );
};

export default App;
