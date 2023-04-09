import React, { Component } from 'react'

import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

  static defaultProps = {
    pageSize: 20,
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async updatePage() {
    this.props.setProgress(10)
    let DataUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30)
    this.setState({ loading: true });
    let data = await fetch(DataUrl);
    let ParsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: ParsedData.articles,
      totalResults: ParsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updatePage();
  }

  // handlePrevClick = async () => {
  //   await this.setState({
  //     page: this.state.page - 1,
  //   })
  //   this.updatePage();
  // }

  // handleNextClick = async () => {
  //   await this.setState({
  //     page: this.state.page + 1,
  //   })
  //   this.updatePage();
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let DataUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(DataUrl);
    let ParsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(ParsedData.articles),
      totalResults: ParsedData.totalResults
    })
  };

  Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  render() {

    document.title = "Newsify - Daily News | " + this.Capitalize(this.props.category)

    return (
      <>
        <h1 id='mainhead' className='container text-center mt-4 '>Top Headlines - {this.Capitalize(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.totalResults !== this.state.articles.length}
          loader={this.state.totalResults - 5 > this.state.articles.length && <Spinner />}
        >
          <div id='MainNewsComp' className='d-flex'>
            <div className="row ">
              {/* !this.state.loading && */ this.state.articles.map((element) => {
                return (
                  <div className="col d-flex justify-content-center" key={element.url}>
                    <Newsitem urlToImage={element.urlToImage ? element.urlToImage : "https://www.newsanyway.com/wp-content/uploads/2022/03/In-the-news-4-10-March-2022.jpg"} title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 100) : ""} url={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.publishedAt} source={element.source.name} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between my-4'>
          <button type="button" disabled={this.state.page <= 1} className="btn btn-secondary mx-4 my-4" onClick={this.handlePrevClick}> &larr; Previous Page</button>
          <button type="button" disabled={Math.ceil(this.state.totalResults / 20) < this.state.page + 1} className="btn btn-secondary mx-4 my-4" onClick={this.handleNextClick}>Next Page &rarr; </button>
        </div> */}
      </>

    )
  }
}