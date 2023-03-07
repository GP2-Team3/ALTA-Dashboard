import React, { useEffect, useState } from 'react';

interface TableProps {
  endpoint: string;
}

interface TableRow {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
  status: string;
}

const Table: React.FC<TableProps> = ({ endpoint }) => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [endpoint]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>NO.</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Team</th>
          <th>Role</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.team}</td>
            <td>{row.role}</td>
            <td>{row.status}</td>
            <td>
              <a href={`/${row.id}/edit`}>Edit</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;