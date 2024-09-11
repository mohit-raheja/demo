import { render, screen, fireEvent } from '@testing-library/react';
import Customer from './Customer';

describe('Customer Component', () => {
    const mockOnAddCustomer = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form with input fields and button', () => {
        render(<Customer onAddCustomer={mockOnAddCustomer} />);

        expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add Customer/i })).toBeInTheDocument();
    });

    it('calls onAddCustomer with correct values when form is submitted', () => {
        render(<Customer onAddCustomer={mockOnAddCustomer} />);

        fireEvent.change(screen.getByLabelText(/First Name:/i) as HTMLInputElement, { target: { value: 'Mohit' } });
        fireEvent.change(screen.getByLabelText(/Last Name:/i) as HTMLInputElement, { target: { value: 'Raheja' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth:/i) as HTMLInputElement, { target: { value: '2000-01-01' } });

        fireEvent.click(screen.getByRole('button', { name: /Add Customer/i }));

        expect(mockOnAddCustomer).toHaveBeenCalledWith({
            firstName: 'Mohit',
            lastName: 'Raheja',
            dob: '2000-01-01'
        });
    });

    it('clears input fields after form submission', () => {
        render(<Customer onAddCustomer={mockOnAddCustomer} />);

        fireEvent.change(screen.getByLabelText(/First Name:/i) as HTMLInputElement, { target: { value: 'Mohit' } });
        fireEvent.change(screen.getByLabelText(/Last Name:/i) as HTMLInputElement, { target: { value: 'Raheja' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth:/i) as HTMLInputElement, { target: { value: '2000-01-01' } });

        fireEvent.click(screen.getByRole('button', { name: /Add Customer/i }));

        expect((screen.getByLabelText(/First Name:/i) as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText(/Last Name:/i) as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText(/Date of Birth:/i) as HTMLInputElement).value).toBe('');
    });
});
