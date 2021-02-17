import React from 'react';

const thStyle = {
  border: '5px solid #FFF',
  backgroundImage: 'linear-gradient(160deg, #F9F630, #F73B1A)',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontWeight: 100,
  padding: 15,
};

export function TableHeading(props) {
  return (
    props.keys.map((key, index) => {
      return <th key={key} style={thStyle}>{key.toUpperCase()}</th>;
    })
  );
}
