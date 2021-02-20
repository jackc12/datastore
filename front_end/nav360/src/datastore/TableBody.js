import React from 'react';
import { TableRow } from './TableRow';

export function TableBody(props) {
  return (
    <tbody> {
      Object.entries(props.data).map((entry, rowIndex) => {
        return (
          <TableRow key={rowIndex} rowIndex={rowIndex} editedData={props.editedData} rowEntries={entry[1]} />
        );
      })
    } </tbody>
  );
}
