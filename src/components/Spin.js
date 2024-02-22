import React, { Component } from 'react'
import loading from './loading.gif'
export default class Spin extends Component {
  render() {
    return (
      <div className='loader-container'>
        <img src={loading} className='loader' alt="loading"/>
      </div>
    )
  }
}
