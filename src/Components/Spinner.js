import React, { Component } from 'react'
import loading from "../Spinner-transparent.gif"
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..." width={100}/>
      </div>
    )
  }
}
