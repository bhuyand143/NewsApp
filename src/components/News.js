import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  captitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    }
    if (this.props.category === 'general') {
      document.title = "NewsMonkey - Get Your Daily Dose Of News Free"
    }
    else {
      document.title = `News Monkey - ${this.captitalizeFirstLetter(this.props.category)}`
    }
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.setState({ loading: false, articles: parsedData.articles, totalResults: parsedData.totalResults })
    this.props.setProgress(100);
  }
  // componentDidMount works after render method
  async componentDidMount() {
    this.updateNews(1);
  }

  // handleNextClick = async () => {
  //   if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //     this.updateNews(this.state.page + 1);
  //     this.setState({ page: this.state.page + 1 });
  //   }
  // }
  // handlePrevClick = async () => {
  //   this.updateNews(this.state.page - 1);
  //   this.setState({ page: this.state.page - 1 });
  // }

  fetchMoreData =async () => {
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
   let data = await fetch(url);
   let parsedData = await data.json();
   this.setState({ loading: false, articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults,page:this.state.page+1 })
  };

  render() {
    return (
      <>
        <h1 className='my-4 text-center'>NewsMonkey-Top {this.props.category === 'general' ? "" : this.captitalizeFirstLetter(this.props.category)} HeadLines!</h1>
        {this.state.loading && <Spinner />}
        {/* above is the spinning component for spinning  */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}>
          <div className="container">
          <div className="row">
            {
              this.state.articles.map((element, idx) => {
                return <div key={element.url} className="col-md-4">
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://im.indiatimes.in/content/2023/Jan/Facebook-Image-1_63ca933c2c729.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} id={idx} />
                </div>
              })}
          </div>
          </div>  
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page === Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News