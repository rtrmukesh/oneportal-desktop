import React from 'react';

const UserList = () => {
  const users = ['John', 'Jane', 'Paul'];

  return (
    <div className="side-list">
      <ul>
        {users.map((user) => (
          <li className='row' key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
