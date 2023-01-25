import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from 'react';

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const captitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    setLoading(false);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  useEffect(() => {
    if (props.category === 'general') {
      document.title = "NewsMonkey - Get Your Daily Dose Of News Free"
    }
    else {
      document.title = `News Monkey - ${captitalizeFirstLetter(props.category)}`
    }
    updateNews();
    //eslint-disable-next-line
  }, [])

  // componentDidMount works after render method
  // async componentDidMount() {
  //   this.updateNews(1);
  // }

  // handleNextClick = async () => {
  //   if (this.state.page < Math.ceil(this.state.totalResults / props.pageSize)) {
  //     this.updateNews(this.state.page + 1);
  //     this.setState({ page: this.state.page + 1 });
  //   }
  // }
  // handlePrevClick = async () => {
  //   this.updateNews(this.state.page - 1);
  //   this.setState({ page: this.state.page - 1 });
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    setArticles(articles.concat(parsedData.articles));
    setPage(page + 1);
  };

  return (
    <>
      <h1 className='text-center' style={{ marginTop: '90px', marginBottom: '20px' }}>NewsMonkey-Top {props.category === 'general' ? "" : captitalizeFirstLetter(props.category)} HeadLines!</h1>
      {loading && <Spinner />}
      {/* above is the spinning component for spinning  */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {
              articles.map((element, idx) => {
                return <div key={element.url} className="col-md-4">
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://im.indiatimes.in/content/2023/Jan/Facebook-Image-1_63ca933c2c729.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} id={idx} />
                </div>
              })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page === Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News