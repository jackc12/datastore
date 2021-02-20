import React from 'react';
import { TableElem } from './TableElem';

export function TableRow(props) {
  props.editedData.map(entry => {
  })
  var edited = false;

  return (
    <tr key={props.rowIndex}>
    {
      Object.entries(props.rowEntries).map((entry, colIndex) => {
        for (var editedDataEntry of props.editedData) {
          edited = editedDataEntry[0] == props.rowIndex && editedDataEntry[1] == colIndex;
          if (edited) break;
        }
        return <TableElem
                key={colIndex}
                col={colIndex}
                row={props.rowIndex}
                edited={edited}
                value={entry[1]}
              />;
      })
    }
    </tr>
  );
}
