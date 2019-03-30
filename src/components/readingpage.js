import React, { Component } from 'react'
import axios from 'axios';
export default class readingpage extends Component {
    constructor(props) {
        super(props);
        {
            this.state = {
                stories: [],
                filteredstories: [],
                existingid: 0,
                active : 0
            }
        }
    }
    componentDidMount() {
        const { foo } = this.props.location.state;
        console.log(`readingpage:`, foo);
        if(foo.length >= 1)
        {
            axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story")
            .then(response => {
                this.setState({
                    stories: response.data.hits
                })
                console.log(this.state.stories);
                for (var i = 0; i < foo.length; i++) {
                    for (var j = 0; j < this.state.stories.length; j++) {
                        console.log(foo[i] + " " + this.state.stories.objectID)
                        if (foo[i] === this.state.stories[j].objectID) {
                            console.log("matching..", foo[i], this.state.stories[i].objectID)
                            const filteredstories = this.state.filteredstories;
                            filteredstories.push(this.state.stories[i]);
                            this.setState({
                                filteredstories
                            })
                            break
                        }
                    }
                }
                console.log(this.state.filteredstories)
            })

        }
        else{
        document.getElementById("danger").innerText = "select some stories at story page!!!"
        }
        
    }
    funcselected = (id) =>
            {
                document.getElementById("title").innerText = this.state.filteredstories[id].title;
                document.getElementById("author").innerText = this.state.filteredstories[id].author;
                document.getElementById("content").innerText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                document.getElementById(id).style.background= "pink"
                this.setState({
                    active : 1,
                    existingid : id
                })
                if(this.state.active === 1)
                {
                    document.getElementById(this.state.existingid).style.background = "lightyellow"
                }
            }
    render() {
        return (
            <div>
                <h4>readingpage</h4>
                <div className="container-fluid">
                <h2 id="danger" style={{color:"red"}}></h2>
                    <div className="row">
                        <div className="col-sm-5" style={{ background: "lightblue", margin:"20" }}>
                        <h4>Your selected stories</h4>
                            {
                                this.state.filteredstories.map((story, index) =>
                                    <div id={index} key={index} className="card w-100 alert-primary change" style={{ margin: "10px",background:"lightyellow" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">Title : {story.title}</h5>
                                            <p className="card-text">Author: {story.author}</p>
                                            <p className="card-text">No_comments: {story.num_comments}</p>
                                            <button className="btn btn-danger"  onClick={() => this.funcselected(index)}>view</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className="col-sm-7" style={{ background: "lightgreen",height:"520px" }}>
                        <h2>viewing story</h2>
                            <h3 id="title"></h3>
                            <h2 id="author"></h2>
                            <p id="content"></p>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


