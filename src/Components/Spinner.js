import React from 'react'
import loading from "../Spinner-transparent.gif"
const Spinner = ()=>{
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..." width={100}/>
      </div>
    )
}

export default Spinner