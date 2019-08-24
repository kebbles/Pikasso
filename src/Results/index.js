import React, { Component } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Divider,
    ListSubheader
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
                    "piano": 0.7
                }
            }
        ];

        const imageData = {
            'piano': 0.2,
            'asian': 0.1,
            'flush': 0.3,
            'kawaii': 0.4,
            'no_weeb': 0.5
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

    renderImageData = imageData => {
        return (
            <Paper>
                <Typography className="image-data__subheader">
                    <div>Detected Object</div>
                    <div>Weight</div>
                </Typography>
                <List className="image-data__list">
                
                    {Object.entries(imageData).map(([name, weight], i) => {
                        return (<>
                        <Divider />
                        <ListItem
                        className="image-data__item"
                        key={name}
                        >
                            <ListItemText primary={name}/>
                            <ListItemText primary={weight} />
                        </ListItem>
                        </>)
                    })}
                    
                </List>
            </Paper>
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
                            <p>Matching you to others...</p>
                        </div>
                ) : (
                    <div className="content">
                        <div className="column-left">
                            {this.renderImageData(this.state.imageData)} 
                        </div>
                        <div className="column-center">
                            {this.renderMatchList()}
                        </div>
                        <div className="column-right">
                            {selected === -1? (
                                <h2>Click on a profile on the left to learn more about them!</h2>
                            ) : (
                                <Paper className="profile-info">
                                    <Typography>
                                    <h2>{this.state.results[selected].name}</h2>
                                    <p>{this.state.results[selected].info}</p>
                                    {this.renderImageData(this.state.results[selected].matchItems)}
                                    </Typography>
                                </Paper>
                            )}
                        </div>
                    </div>
                )}

                
            </div>
        );
    }
}