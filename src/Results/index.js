import React, { Component } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Paper,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';
import _ from 'lodash';
import './styles.scss';


export default class Results extends Component {
    
    constructor(props){
        super(props);

        const data = Object.entries(this.props.matchData).map(([id, obj]) => {
            return {
                id,
                ...obj,
            }
        });

        const results = data.sort((obj1, obj2) => obj1.closeness_ranking - obj2.closeness_ranking);
        this.state = {
            results: results.length? results : undefined,
            selected: -1,
        }
    }

    componentDidUpdate(prevProps) {
        if(!_.isEqual(this.props.matchData, prevProps.matchData)){
            console.log(this.props.matchData);
            if(String(this.props.matchData) === '{}'){
                this.setState({
                    results: undefined,
                    selected: -1,
                })
                return;
            }

            const data = Object.entries(this.props.matchData).map(([id, obj]) => {
                return {
                    id,
                    ...obj,
                }
            });
    
            const results = data.sort((obj1, obj2) => obj1.closeness_ranking - obj2.closeness_ranking)
            this.setState({
                results: results.length? results : undefined,
            });
        }
        
    }

    static defaultProps = {
        // matchData: {
        //     "12345": {
        //         "full_name": "Eric Liang",
        //         "object_associations": {
        //             "Electronics": 5,
        //             "Cars": 3,
        //         },
        //         "closeness_ranking": 1
        //     },
        //     "23456": {
        //         "full_name": "Bob Builder",
        //         "object_associations": {
        //             "Cat": 4
        //         },
        //         "closeness_ranking": 2
        //     },
        //     "3": {
        //         "full_name": "Enoch Poon",
        //         "object_associations": {
        //             "uwu's": 5,
        //             "Frontend": 3,
        //             "Maplestory": 3,
        //             "Rice": 3,
        //             "Food": 3,
        //         },
        //         "closeness_ranking": 3
        //     }
        // },
        matchData: {},
        // imageData: {
        //     'piano': 0.1333,
        //     'asian': 0.333,
        //     'flush': 0.3333,
        //     'cute': 0.2333,
        //     'no_weeb': 0.1333
        // }
        imageData: {

        }
    }

    componentDidMount() {
        
    }

    renderMatchList = () => {
        const switchProfile = (num) => {
            if(this.state.selected === num)return;
            this.profileRef.setAttribute('style', 'right: -32.5%');
            setTimeout(() => {
                this.setState({ selected: num }, () => this.profileRef.setAttribute('style', 'right: 50px'));
            }, 200);
        }
        return (
            <Paper>
                <div className="match__list__header">
                    Matched profiles
                </div>
                <List className="match__list">
                    {this.state.results.map((r, i) => {
                        return (
                            <ListItem 
                            divider
                            button 
                            className="match__item" 
                            key={i} 
                            onClick={() => switchProfile(i)}
                            selected={i === this.state.selected}>
                                <ListItemAvatar>
                                    <Avatar 
                                    src={`https://api.adorable.io/avatars/122/${String(r.full_name).replace(' ', '')}.png`} />
                                </ListItemAvatar>
                                <ListItemText primary={r.full_name} className="listText" />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
            
        )
    }

    renderComparisonData = imageData => {
        imageData = Object.entries(imageData).sort().sort((obj1, obj2) => obj2[1] - obj1[1])
        return (
            <Paper>
                <div className="image-data__subheader">
                    <span>Detected Object</span>
                    <span>Association Strength</span>
                </div>
                <List className="image-data__list">
                
                    {imageData.map(([name, weight]) => {
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

    renderImageData = imageData => {
        imageData = Object.entries(imageData).sort().sort((obj1, obj2) => obj2[1] - obj1[1])
        return (
            <Paper>
                <div className="image-data__subheader">
                    <span>Detected Object</span>
                    <span>Weight</span>
                </div>
                <List className="image-data__list">
                
                    {imageData.map(([name, weight]) => {
                        weight *= 100;
                        return (
                        <ListItem
                        divider
                        className="image-data__item"
                        key={name}
                        >
                            <ListItemText primary={name}/>
                            <ListItemText primary={`${weight.toFixed(2)}%`} />
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
            {!this.state.results || this.props.imageData === undefined ? (
                <div className="loading-screen">
                    <CircularProgress disableShrink className="loading-icon" size={100}/>
                    <p>Matching you to other profiles...</p>
                </div>
            ) : (
                <>
                    <h1 className="results-title">RESULTS</h1>
                    <div className="content">
                        <div className="column-left">
                            {this.renderImageData(this.props.imageData)} 
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
                                    <Avatar src={`https://api.adorable.io/avatars/122/${results[selected].full_name.replace(' ', '')}.png`} />
                                    <h2>{results[selected].full_name}</h2>
                                    </div>
                                    <p className="MuiTypography-body1">Closeness ranking: {results[selected].closeness_ranking}</p>
                                    {this.renderComparisonData(results[selected].object_associations)}
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