import React from 'react';
import { TableElem } from './TableElem'

export function TableBody(props) {
  //reshape data to be rendered in table
  var a = {};
  Object.keys(props.data[Object.keys(props.data)[0]]).map((key, index) => {
    a[index] = [];
  })
  Object.entries(props.data).map((entry, index) => {
    Object.entries(entry[1]).map((_entry, _index) => {
      a[_index].push(_entry[1]);
    })
  })

  return (
    Object.entries(a).map((entry, rowIndex) => {
      return (
        <tr key={rowIndex}>
        {
          entry[1].map((entry, colIndex) => {
            return <TableElem key={colIndex} col={colIndex} row={rowIndex} value={entry} />;
          })
        }
        </tr>
      );
    })
  );
}
