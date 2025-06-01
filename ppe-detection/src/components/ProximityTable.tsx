import React from 'react';

const data = [
  { worker: 101, machine: 201, distance: 6.2, status: 'Safe' },
  { worker: 102, machine: 202, distance: 6.5, status: 'Safe' },
  { worker: 103, machine: 203, distance: 3.2, status: 'Warning' },
  { worker: 104, machine: 204, distance: 3.5, status: 'Warning' },
  { worker: 105, machine: 205, distance: 1.3, status: 'Danger' },
];

const ProximityTable: React.FC = () => {
  return (
    <div className="proximity-table">
      <table>
        <thead>
          <tr>
            <th>Worker ID</th>
            <th>Machine ID</th>
            <th>Distance (m)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.worker}</td>
              <td>{row.machine}</td>
              <td>{row.distance}</td>
              <td className={`status ${row.status.toLowerCase()}`}>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProximityTable;