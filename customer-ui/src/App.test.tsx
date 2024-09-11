import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { fetchCustomers, addCustomer } from './apiUtils/api';
import '@testing-library/jest-dom';

jest.mock('./apiUtils/api');

describe('App Component', () => {
  beforeEach(() => {
    (fetchCustomers as jest.Mock).mockResolvedValue(
      Array.from({ length: 10 }, (_, i) => ({
        firstName: `First${i}`,
        lastName: `Last${i}`,
        dob: `2000-01-01`
      }))
    );
    (addCustomer as jest.Mock).mockResolvedValue({
      firstName: 'New',
      lastName: 'Customer',
      dob: '2001-01-01'
    });
  });

  it('renders the customer list and handles pagination', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('First0 Last0 - 01-01-2000')).toBeInTheDocument();
    });
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => {
      expect(screen.queryByText('First0 Last0 - 01-01-2000')).not.toBeInTheDocument();
      expect(screen.getByText('First5 Last5 - 01-01-2000')).toBeInTheDocument();
    });
  });

  it('shows an error message when fetch fails', async () => {
    (fetchCustomers as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Error fetching customers')).toBeInTheDocument();
    });
  });

  it('adds a new customer and updates the list', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { value: 'New' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { value: 'Customer' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2001-01-01' }
    });
    fireEvent.click(screen.getByText(/Add Customer/i));
    await waitFor(() => {
      expect(screen.getByText('New Customer - 01-01-2001')).toBeInTheDocument();
    });
  });

  xit('handles pagination correctly with new data', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('First0 Last0 - 01-01-2000')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => {
      expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
      expect(screen.getByText('First5 Last5 - 01-01-2000')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
      target: { value: 'New' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
      target: { value: 'Customer' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2001-01-01' }
    });
    fireEvent.click(screen.getByText(/Add Customer/i));
  
    await waitFor(() => {
      expect(screen.getByText('New Customer - 01-01-2001')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText(/Previous/i));

    await waitFor(() => {
      expect(screen.queryByText('First5 Last5 - 01-01-2000')).not.toBeInTheDocument();
      expect(screen.getByText('New Customer - 01-01-2001')).toBeInTheDocument();
    });
  });
  
});
