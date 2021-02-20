import React from 'react';

const tdStyle = {
  border: '5px solid #FFF',
  borderRadius: 5,
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontWeight: 100,
  padding: 10,
};

export class TableElem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edited: this.props.edited,
      tableEntry: this.props.value,
    };
  }
  updateServer(row, col) {
    const newValue = window.prompt('Enter new value');
    if (newValue) {
      fetch(`http://127.0.0.1:5000/post_edited_table_entries/${row}/${col}`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(newValue),
      })
      .then(res => res.text())
      .then(
        result => {
          this.setState({
            edited: true,
            tableEntry: newValue,
          })
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
    }
  }
  render() {
    return (
      <td key={this.props.col}
          style={{...tdStyle, backgroundImage: this.state.edited ? 'linear-gradient(160deg, #EC09FF, #FA0B0B)' : 'linear-gradient(160deg, #4AF2DB, #4AD6F2)',}}
          onClick={() => this.updateServer(this.props.row, this.props.col)}>
        {this.state.tableEntry}
      </td>
    );
  }
}
