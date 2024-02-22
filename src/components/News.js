import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spin from './Spin';
import PropTypes from 'prop-types'
// import {render} from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  // articles =  [
  //   {
  //     "source": {
  //       "id": "news24",
  //       "name": "News24"
  //     },
  //     "author": "Lloyd Burnard",
  //     "title": "Zimbabwean cricket great Heath Streak dead at 49",
  //     "description": "Zimbabwean cricket great Heath Streak died at 49, his wife confirmed on Sunday.",
  //     "url": "https://www.news24.com/sport/cricket/zimbabwean-cricket-great-heath-streak-dead-at-49-20230903",
  //     "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/9244/996ac4052da04d67abf3df6dca34f2c0.jpg",
  //     "publishedAt": "2023-09-03T10:28:11",
  //     "content": "Former Zimbabwe cricket captain and one of the country's greatest ever players, Heath Streak, died at the age of 49 on Sunday. \r\nHe had been diagnosed with liver and colon cancer. \r\nStreak's wife, Na… [+587 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "news-com-au",
  //       "name": "News.com.au"
  //     },
  //     "author": null,
  //     "title": "Famous cricketer dead, wife confirms",
  //     "description": "Just over a week after false reports of his passing, Zimbabwean cricketing great Heath Streak has now died after a battle with cancer.",
  //     "url": "https://www.news.com.au/sport/cricket/a-week-after-false-reports-cricketer-heath-streak-has-now-passed-away/news-story/a6b58aed240150da4f1ea7005d632e23",
  //     "urlToImage": "https://content.api.news/v3/images/bin/7d4017291ef15551079cb671231ed28a",
  //     "publishedAt": "2023-09-03T09:48:00Z",
  //     "content": "Just over a week after false reports of his passing, Zimbabwean cricketing great Heath Streak has now died after a battle with cancer.\r\nStreak’s wife Nadine posted the news on Facebook that the 49-ye… [+2361 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

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

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      // articles: this.articles    ---> it was used when articles was defned locally
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.props.category} - news`
  }

  async updateNews(){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b1d499669fef44f6a613f4d85edeb438&page=1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(25);
    let parseData = await data.json();
    console.log("data", parseData);
    // this.state({loading: false})
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b1d499669fef44f6a613f4d85edeb438&page=1&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log("data", parseData);
    // // this.state({loading: false})
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false
    // }) //this is where articles get updated with api
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b1d499669fef44f6a613f4d85edeb438&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log("data", parseData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {


    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b1d499669fef44f6a613f4d85edeb438&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true })
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   console.log("data", parseData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading: false
    //   })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();

  }

  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   //  const nextPage = this.state.page + 1;
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b1d499669fef44f6a613f4d85edeb438&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log("data", parseData);
  //   // this.state({loading: false})
  //   this.setState({
  //     articles: this.state.articles.concat(parseData.articles),
  //     totalResults: parseData.totalResults,
  //     loading: false,
  //     // page: nextPage
  //   });
  // };

  
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1; // Increment the page
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b1d499669fef44f6a613f4d85edeb438&page=${nextPage}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("data", parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
      page: nextPage, // Update the page state after fetching data
    });
  };
  

  render() {
    return (
      <>
        <h2 className='text-center'>News Daily - {this.props.category}</h2>
        {/* {this.state.loading && <Spin />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spin />}
        >
          <div className='container'>

            <div className='row'>
              {/* !this.state.loading && this.state.articles.map((element) => { -----> "!this.state.loading" this was removed in the next line */}
              {this.state.articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.title ? element.title.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}> prev</button>
          <button type="button" className="btn btn-secondary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next</button>
        </div> */}
        {/* the previous lines were removed to remove previous and next buttons, so that "InfiniteScroll" can be used */}
      </>
    )
  }
}
