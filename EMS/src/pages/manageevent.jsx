import React from 'react';

const Manageevent = () => {
  return (
    <div>
      <h1>Manage Events</h1>
      <p>Here you can edit or delete events.</p>
      <ul>
        {/* Example of existing events, replace with dynamic data */}
        <li>
          Event 1 - <button>Edit</button> <button>Delete</button>
        </li>
        <li>
          Event 2 - <button>Edit</button> <button>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default Manageevent;
