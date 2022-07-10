import React, { Component } from "react";

export default class Newsitem extends Component {

    render() {
        let { title, description, imageurl,newsurl } = this.props;
       
        return (
        <div className="my-3">
            <div className="card" >
            <img src={imageurl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a rel="noreferrer" href={newsurl} target="_blank" className="btn btm-sm btn-dark">
                Read More...
                </a>
            </div>
            </div>
        </div>
        );
    }
}
