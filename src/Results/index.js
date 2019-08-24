import React, { Component } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@material-ui/core';
import './styles.scss';
export default class Results extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            selected: -1
        }
    }
    componentDidMount() {
        //make api call to get results
        const data = [
            {
                name: 'Eric Liang',
                info: 'He loves piano and thinks front-end is stupid'
            },
            {
                name: 'Hayden Wang',
                info: 'He didn\'nt sleep last night'
            },
            {
                name: 'Enoch Poon',
                info: 'Has no idea what he\'s doing'
            }
        ];

        const imageData = {
            'puppy': 20,
            'asian': 10,
            'flush': 70,
        }

        setTimeout(() => {
            this.setState({ results: data, imageData: imageData });
        }, 500);
    }

    renderMatchList = () => {
        return (
            <List>
                {this.state.results.map((r, i) => {
                    return (
                        <ListItem 
                        button 
                        className="match__item" 
                        key={i} 
                        onClick={() => this.setState({selected: i})}
                        selected={i === this.state.selected}>
                            <ListItemText primary={r.name} className="listText" />
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    renderImageData = () => {
        return (
            <List className="image-data__list">
                {Object.entries(this.state.imageData).map(([name, percent], i) => {
                    return (<ListItem
                    className="image-data__item"
                    key={name}
                    >
                        <ListItemText primary={name} />
                        <ListItemText primary={`${percent}%`} />
                    </ListItem>)
                })}
            </List>
        )
    }
    render() {
        const { selected } = this.state;
        return (
            <div className="results-wrapper">
            <h1 className="results-title">RESULTS</h1>
                
                {this.state.results === undefined || this.state.imageData === undefined ? (
                        <div className="loading-screen">
                            <CircularProgress disableShrink className="loading-icon" size={100}/>
                        </div>
                ) : (
                    <div className="content">
                        <div className="column-left">
                            {this.renderMatchList()}
                            {this.renderImageData()} 
                        </div>
                        <div className="column-right">
                            {selected === -1? (
                                <h2>Click on a profile on the left to learn more about them!</h2>
                            ) : (
                                <div className="profile-info">
                                    <h2>{this.state.results[selected].name}</h2>
                                    <p>{this.state.results[selected].info}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                
            </div>
        );
    }
}