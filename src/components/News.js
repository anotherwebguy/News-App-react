import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor(){
        super();
        
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            // category: this.props.category
        }
        // console.log(this.state.category)
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=1&pageSize=20`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        })
    }

    handlePrevClick = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page-1}&pageSize=20`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading:false
        })
    }

    handleNextClick = async() => {
        if(this.state.page+1<=Math.ceil(this.state.totalResults/20)){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page+1}&pageSize=20`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading:false
            })
        }
    }

    render() {
        return (
        <div className="container my-3">
            <h1 className='text-center'>Atankwadi News - Aapko rakho piche</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div key={element.url} className="col-md-4">
                    <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage?element.urlToImage:"https://i-invdn-com.investing.com/news/world_news_2_69x52._800x533_L_1419494365.jpg"} newsurl = {element.url?element.url:"https://www.investing.com/news/world-news/nasa-to-showcase-webb-space-telescopes-first-fullcolor-images-2845684"}/>
                </div>;
            })}
            </div>
            <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
            </div>
        </div>
        )
    }
}
