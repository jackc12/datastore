import React from 'react';

const divStyle = {
  backgroundImage: 'linear-gradient(160deg, #C530F9, #6A30F9)',
  padding: 10,
  textAlign: 'center',
},
h3Style = {
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontWeight: 100,
},
buttonStyle = {
  border: 'none',
  borderRadius: 5,
  color: '#FFF',
  padding: 10,
  backgroundImage: 'linear-gradient(160deg, #12C646, #83F926)',
};

function resetServer() {
  fetch('http://127.0.0.1:5000/original_dataset')
  .then(res => res.json())
  .then(
    result => {
      console.log(result);
    },
    error => {
      console.log(error);
    }
  )
  window.location.reload();
}

export function Instructions(props) {
  return (
    <div style={divStyle}>
      <a href='https://www.kaggle.com/michau96/restaurant-business-rankings-2020'>Restaurant Business Rankings 2020</a>
      <h3 style={h3Style}>Click on a table entry to edit it</h3>
      <h3 style={h3Style}>Click the "Original Dataset" button to revert any changes</h3>
      <button style={buttonStyle} onClick={_ => resetServer()}>Original Dataset</button>
    </div>
  );
}
