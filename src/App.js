import './App.css';

import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {

  let pageSize = 20;
  let apiKey = process.env.REACT_APP_NEWS_API;


  const [progress, setProgress] = useState(0)
  // state = {
  //   progress:0
  // }
  // setProgress = (progress)=>{
  //   setState({progress: progress})
  // }

    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route path='/' element={<News setProgress = {setProgress} apiKey = {apiKey} key='general' pageSize={pageSize} country="in" category="general" />} />
            <Route path='/business' element={<News setProgress = {setProgress} apiKey = {apiKey} key='business' pageSize={pageSize} country="in" category="business" />} />
            <Route path='/entertainment' element={<News setProgress = {setProgress} apiKey = {apiKey} key='entertainment' pageSize={pageSize} country="in" category="entertainment" />} />
            <Route path='/health' element={<News setProgress = {setProgress} apiKey = {apiKey} key='health' pageSize={pageSize} country="in" category="health" />} />
            <Route path='/science' element={<News setProgress = {setProgress} apiKey = {apiKey} key='science' pageSize={pageSize} country="in" category="science" />} />
            <Route path='/sports' element={<News setProgress = {setProgress} apiKey = {apiKey} key='sports' pageSize={pageSize} country="in" category="sports" />} />
            <Route path='/technology' element={<News setProgress = {setProgress} apiKey = {apiKey} key='technology' pageSize={pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;