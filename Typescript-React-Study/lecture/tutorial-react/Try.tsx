import * as React from 'react';
import { Component } from 'react';
import { Tryinfo } from './ClientDOM'; 

class Try extends Component<{tryInfo:Tryinfo}> {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;