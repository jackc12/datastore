import React from 'react';
import { Table } from './Table';
import { Instructions } from './Instructions';

const h1Style = {
  padding: 100,
  textAlign: 'center',
};

export class DataStore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      error: null,
      tableData: null,
      editedData: null,
    };
  }

  tableTransform() {
    if (this.state.data) {
      this.a = {};
      Object.keys(this.state.data[Object.keys(this.state.data)[0]]).map((key, index) => {
        this.a[index] = [];
      });
      Object.entries(this.state.data).map((entry, index) => {
        Object.entries(entry[1]).map((_entry, _index) => {
          this.a[_index].push(_entry[1]);
        });
      });
      this.setState({
        tableData: this.a,
      })
    }
  }

  entriesStringToArray(result) {
    var entries = [], rowCol =
    result.slice(2,-2).split(']').map(entry => {
      rowCol = [];
      entry.split(',').map(entry => {
        entry = entry.replace('[','')
        entry = parseInt(entry);
        if (!isNaN(entry)) {
          rowCol.push(entry)
        }
      })
      if (rowCol.length) {
        entries.push(rowCol)
      }
    })
    return entries;
  }

  fetchTableData() {
    fetch('http://127.0.0.1:5000/get_table_data')
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          data: JSON.parse(result),
        });
        this.tableTransform();
      },
      error => {
        this.setState({
          error: error
        });
      }
    )
  }

  fetchEditedData() {
    fetch('http://127.0.0.1:5000/get_edited_table_entries')
    .then(res => res.text())
    .then(
      result => {
        this.setState({
          editedData: this.entriesStringToArray(result),
        });
      },
      error => {
        this.setState({
          error: error
        });
      }
    )
  }

  fetchData() {
    this.fetchTableData();
    this.fetchEditedData();
  }


  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (!this.state.tableData || !this.state.editedData) {
      return <h1 style={h1Style}>Loading</h1>;
    }
    return (
      <div>
        <Instructions />
        <Table columns={Object.keys(this.state.data)} editedData={this.state.editedData} data={this.state.tableData} />
      </div>
    )
  }
}
