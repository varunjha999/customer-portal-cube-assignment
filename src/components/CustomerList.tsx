import React from 'react';
import { Customer } from '../types';

interface CustomerListProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, selectedCustomer, onSelect }) => {
  return (
    <div className="w-1/3 overflow-y-auto bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Customers List</h2>
      {customers.map(customer => (
        <div
          key={customer.id}
          onClick={() => onSelect(customer)}
          className={`p-4 mb-2 cursor-pointer ${selectedCustomer?.id === customer.id ? 'bg-blue-200' : 'bg-white'}`}
        >
          <h3 className="font-bold">{customer.name}</h3>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
}

export default CustomerList;
