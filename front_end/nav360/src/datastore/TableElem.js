import React from 'react';

const tdStyle = {
  border: '5px solid #FFF',
  borderRadius: 5,
  color: '#FFF',
  backgroundImage: 'linear-gradient(160deg, #4AF2DB, #4AD6F2)',
  fontFamily: 'sans-serif',
  fontWeight: 100,
  padding: 10,
};

export class TableElem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      background: tdStyle.backgroundImage,
    };
  }

  updateServer(key, row) {
    const newValue = window.prompt('Enter new value');
    if (newValue) {
      this.setState({
        value: newValue,
        background: 'linear-gradient(160deg, #EC09FF, #FA0B0B)',
      });

      fetch(`http://127.0.0.1:5000/${key}/${row}`,{
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(newValue),
      })
      .then(
        result => {
          console.log(result)
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  render() {
    return (
      <td key={this.props.col}
          style={{...tdStyle, backgroundImage: this.state.background,}}
          onClick={_ => this.updateServer(this.props.col, this.props.row)}>
        {this.state.value}
      </td>
    );
  }
}
