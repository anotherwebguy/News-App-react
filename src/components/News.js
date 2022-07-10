import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
  render() {
    return (
      <div>
        This is News
        <Newsitem/>
        <Newsitem/>
        <Newsitem/>
      </div>
    )
  }
}
