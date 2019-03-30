import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import Readingpage from './readingpage';
import axios from 'axios';

export default class storylist extends Component {
    constructor(props) {
        super(props);
        {
            this.state = {
                stories: [],
                selectedstories: [],
                check : 0
            }
        }
    }
    componentDidMount = () => {
        axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story")
            .then(response => {
                this.setState({
                    stories: response.data.hits
                })
                console.log(this.state.stories);
                for (var i = 0; i < this.state.stories.length; i++) {
                    const hit = this.state.stories[i];
                    hit.status = 0;
                }
                console.log(this.state.stories[0].attack)
            })
    }
    funcselected = (objid, id) => {
        
        for (var i = 0; i < this.state.selectedstories.length; i++) {
            if(this.state.selectedstories[i] === objid)
            {
              this.state.check = 1;
            }
        }
        if(this.state.check === 1)
        {
            const selectedstories = this.state.selectedstories;
            selectedstories.pop(objid);
            document.getElementById(id).className += "card w-100 alert-primary";
            this.setState({
                selectedstories,
                check : 0
            })

        }
        else{
            const selectedstories = this.state.selectedstories;
            document.getElementById(id).className += "card w-100 alert-success";
            selectedstories.push(objid);
            this.setState({
                selectedstories
            })
        }  
        console.log(this.state.selectedstories)
    }

    render() {
        return (
            <div>
                <h4>StoryList Page</h4>

                <div className="container" style={{ padding: "10px", alignContent: "center" }}>
                    <div className="row" style={{justifyContent:"center",width:"100%"}}>
                        <div style={{marginRight:"20px",color:"red",fontSize:"24px"}} className="text">Click story card to select and click button to view    </div>
                        <Link  className="btn btn-success" to={{ pathname: '/readingpage', state: { foo: this.state.selectedstories } }}>Reading section</Link>
                    </div>

                    {
                        this.state.stories.map((story, index) =>
                            <div id={index} key={index} onClick={() => this.funcselected(story.objectID, index)} className="card w-100 alert-primary" style={{ margin: "10px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Title : {story.title}</h5>
                                    <p className="card-text">Author: {story.author}</p>
                                    <p className="card-text">No_comments: {story.num_comments}</p>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
        )
    }
}
