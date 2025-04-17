import React from 'react';
import { FiUser } from 'react-icons/fi'; // You can choose any icon you prefer

const NoRecordsFound = ({ message = 'No records found' }) => {
    return (
        <div className="text-center py-4 text-white">
            <FiUser size={48} className="mb-2" />
            <p className="mt-2">{message}</p>
        </div>
    );
};

export default NoRecordsFound;
