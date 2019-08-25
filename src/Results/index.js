import React, { Component } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Paper,
    Typography,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';
import axios from 'axios';
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
                info: 'He loves piano and thinks front-end is stupid',
                matchItems: {
                    "piano": 0.9,
                    "asian": 0.9,
                }
            },
            {
                name: 'Hayden Wang',
                info: 'He didn\'t sleep last night',
                matchItems: {
                    "asian": 0.9,
                    "flush": 0.5
                }
            },
            {
                name: 'Enoch Poon',
                info: 'Has no idea what he\'s doing',
                matchItems: {
                    "asian": 0.9,
                    "flush": 0.8,
                    "piano": 0.7,
                    "cute": 9001
                }
            }
        ];
        
        const imageData = {
            'piano': 0.2,
            'asian': 0.1,
            'flush': 0.3,
            'cute': 0.4,
            'no_weeb': 0.5
        }

        setTimeout(() => {
            this.setState({ results: data, imageData: imageData });
        });

        
    }

    renderMatchList = () => {
        const switchProfile = (num) => {
            this.profileRef.setAttribute('style', 'right: -30.5%');
            setTimeout(() => {
                this.setState({ selected: num}, () => this.profileRef.setAttribute('style', 'right: 50px'));
            }, 200);
        }
        return (
            <Paper>
                <Typography className="match__list__header">
                    Matched profiles
                </Typography>
                <List className="match__list">
                    {this.state.results.map((r, i) => {
                        return (
                            <>
                                <ListItem 
                                divider
                                button 
                                className="match__item" 
                                key={i} 
                                onClick={() => switchProfile(i)}
                                selected={i === this.state.selected}>
                                    <ListItemAvatar>
                                        <Avatar 
                                        src={`https://api.adorable.io/avatars/122/${r.name.replace(' ', '')}.png`} />
                                    </ListItemAvatar>
                                    <ListItemText primary={r.name} className="listText" />
                                </ListItem>
                            </>
                        )
                    })}
                </List>
            </Paper>
            
        )
    }

    renderImageData = imageData => {
        return (
            <Paper>
                <Typography className="image-data__subheader">
                    <span>Detected Object</span>
                    <span>Weight</span>
                </Typography>
                <List className="image-data__list">
                
                    {Object.entries(imageData).map(([name, weight], i) => {
                        return (
                        <ListItem
                        divider
                        className="image-data__item"
                        key={name}
                        >
                            <ListItemText primary={name}/>
                            <ListItemText primary={weight} />
                        </ListItem>
                        )
                    })}
                    
                </List>
            </Paper>
        )
    }

    render() {
        const {selected, results } = this.state;

        return (
            <div className="results-wrapper">
            {this.state.results === undefined || this.state.imageData === undefined ? (
                <div className="loading-screen">
                    <CircularProgress disableShrink className="loading-icon" size={100}/>
                    <p>Matching you to others...</p>
                </div>
            ) : (
                <>
                    <h1 className="results-title">RESULTS</h1>
                    <div className="content">
                        <div className="column-left">
                            {this.renderImageData(this.state.imageData)} 
                        </div>
                        <div className="column-center">
                            {this.renderMatchList()}
                        </div>
                        <div className="column-right">
                            <Paper className="profile-info" ref={r => this.profileRef = r}>
                                {selected === -1? (
                                <h2>Select a profile.</h2>
                                ) : (
                                <>
                                    <div className="profile__header">
                                    <Avatar src={`https://api.adorable.io/avatars/122/${results[selected].name.replace(' ', '')}.png`} />
                                    <h2>{results[selected].name}</h2>
                                    </div>
                                    <p className="MuiTypography-body1">{results[selected].info}</p>
                                    {this.renderImageData(results[selected].matchItems)}
                                </>
                                )}
                            </Paper>
                        </div>
                    </div>
                </>
            )}

                
            </div>
        );
    }
}