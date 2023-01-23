import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:8, 
    category:'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }
  // componentDidMount works after render method
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf83b2916e2a44b2bc7a5f61dff4a735&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url); 
    let parsedData = await data.json();
    this.setState({loading:false,articles: parsedData.articles,totalResults:parsedData.totalResults })
  }

  handleNextClick= async()=>{
    if(this.state.page<Math.ceil(this.state.totalResults/this.props.pageSize))
    {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf83b2916e2a44b2bc7a5f61dff4a735&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading:false,articles: parsedData.articles,page:this.state.page+1 })
    }
  }
  handlePrevClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf83b2916e2a44b2bc7a5f61dff4a735&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading:false,page:this.state.page-1, articles: parsedData.articles })
  }

  render() {
    return (
      <div className='container'>
        <h1 className='my-4 text-center'>NewsMonkey-Top HeadLines!</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {
            (!this.state.loading) && this.state.articles.map((element,idx) => {
              return <div key={element.url} className="col-md-4">
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://im.indiatimes.in/content/2023/Jan/Facebook-Image-1_63ca933c2c729.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} id={idx}/>
              </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News