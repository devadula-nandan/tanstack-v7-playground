import React from 'react';
import { useTable } from 'react-table';


function calculateColumnWidth(data, accessorKey) {
  const maxLength = Math.max(...data.map(item => item[accessorKey].length));
  const charWidth = 8; // Approximate width of a character in pixels
  return maxLength * charWidth;
}

function App() {
  const [data, setData] = React.useState([
    {
      col1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      col2: 'World',
    },
    {
      col1: 'TanStack',
      col2: 'Table',
    },
    {
      col1: 'React',
      col2: 'Table',
    },
  ]);


  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
        width: calculateColumnWidth(data, 'col1'),
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ['col2'],
    }
  });

  return (
    <>
      <button onClick={() => setData(data.slice(0, -1))}>delete row</button>
      {allColumns.map(column => (
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
            {column.id}
          </label>
        </div>
      ))}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th style={{ width: column.width }} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
