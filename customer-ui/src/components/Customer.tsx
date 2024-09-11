import React, { useState } from 'react';
import './../App.css';

interface CustomerProps {
    onAddCustomer: (customer: { firstName: string; lastName: string; dob: string }) => void;
}

const Customer: React.FC<CustomerProps> = ({ onAddCustomer }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onAddCustomer({ firstName, lastName, dob });
        setFirstName('');
        setLastName('');
        setDob('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter First Name"
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Last Name"
                    required
                />
            </div>
            <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default Customer;
