import React, { useEffect, useState } from 'react'

import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  // constructor() {
  //   super();
  //   this.state = {
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //     totalResults: 0
  //   }
  // }

  const updatePage = async ()=>{
    props.setProgress(10)
    let DataUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30)

    setLoading(true)
    // this.setState({ loading: true });

    let data = await fetch(DataUrl);
    let ParsedData = await data.json();
    props.setProgress(70)


    setArticles(ParsedData.articles)
    setLoading(false)
    setTotalResults(ParsedData.totalResults)
    // this.setState({
    //   articles: ParsedData.articles,
    //   totalResults: ParsedData.totalResults,
    //   loading: false
    // })


    props.setProgress(100)
  }
  
  useEffect(() => {
    updatePage();
    // eslint-disable-next-line
  }, [])
  // componentDidMount = async ()=> {
  //   this.updatePage();
  // }


  // handlePrevClick = async () => {                      When Infinite Scroll didn't exist
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

  const fetchMoreData = async () => {

    setPage(page+1)
    // this.setState({ page: this.state.page + 1 })

    let DataUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(DataUrl);
    let ParsedData = await data.json();

    setArticles(articles.concat(ParsedData.articles))
    setTotalResults(ParsedData.totalResults)
    // this.setState({
    //   articles: this.state.articles.concat(ParsedData.articles),
    //   totalResults: ParsedData.totalResults
    // })
  };

  const Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }


  document.title = "Newsify - Daily News | " + Capitalize(props.category)

  return (
    <>
      <h1 id='mainhead' className='container text-center '>Top Headlines - {Capitalize(props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={totalResults !== articles.length}
        loader={totalResults - 5 > articles.length && <Spinner />}
      >
        <div id='MainNewsComp' className='d-flex'>
          <div className="row ">
            {/* !this.state.loading && */ articles.map((element) => {
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

export default News

News.defaultProps = {
  pageSize: 20,
  country: 'in',
  category: 'general'
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}