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
      didLoad: false,
      data: ['empty'],
      error: 'all good rn',
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000')
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          didLoad: true,
          data: JSON.parse(result),
        })
      },
      error => {
        this.setState({
          didLoad: false,
          data: ['this error', 'ok'],
          error: error
        });
      }
    )
  }

  render() {
    if (!this.state.didLoad) {
      return <h1 style={h1Style}>Loading</h1>;
    }
    return (
      <div>
        <Instructions />
        <Table columnName='Restaurant' data={this.state.data} />
      </div>
    )
  }
}
