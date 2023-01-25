// import logo from './logo.svg';
import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

const App=()=> {
  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const setProgression=(progress)=>{
    setProgress(progress)
  }
    return (
      <>
        <Router>
          <NavBar/>
          <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgression} apiKey={apiKey}  key="general" pageSize={pageSize} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News setProgress={setProgression} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={setProgression} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News setProgress={setProgression} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News setProgress={setProgression} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={setProgression} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={setProgression} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
          </Routes>
        </Router>
      </>
    )
}

export default App

