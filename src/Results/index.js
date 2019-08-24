import React, { Component } from 'react';
import MatchDetailsModal from './MatchDetailsModal/index.js';

export default class Results extends Component {
    state = {
        selected: -1,
        results: []
    };
    componentDidMount() {
        //make api call to get results
        const data = [];
        this.setState({ results: data });
    }
    render() {
        return (
            <div>
                <h1>RESULTs</h1>
                {/* <MatchDetailsModal results={this.state.results} selected={this.state.selected} /> */}
            </div>
        );
    }
}