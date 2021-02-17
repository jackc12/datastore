import React from 'react';
import { TableHeading } from './TableHeading';
import { TableBody } from './TableBody';

const tableStyle = {
  borderCollapse: 'collapse',
  fontFamily: 'sans-serif',
  textAlign: 'center',
  width: '100%',
};

export function Table(props) {
  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <TableHeading keys={Object.keys(props.data)}/>
          </tr>
        </thead>
          <tbody>
            <TableBody data={props.data} />
          </tbody>
      </table>
    </div>
  );
}
