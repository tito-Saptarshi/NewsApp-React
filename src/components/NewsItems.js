import React, { Component } from 'react'

export default class NewsItems extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, date, author, source } = this.props;
    return (
      <div className='my-3 '>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={!imageUrl ? "https://cdn.24.co.za/files/Cms/General/d/9244/996ac4052da04d67abf3df6dca34f2c0.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>

            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {date}</small></p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-info">Read More</a>

          </div>

        </div>

      </div>
    )
  }
}
