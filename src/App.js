import React, { useState } from 'react'
import "./App.css"
import Navbar from './Components/Navbar'
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App=()=>{
  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_API;

    // document.body.style.backgroundColor="#dfdede";
  const [progress, setProgress] = useState(0)

    return (
      <div >
        <BrowserRouter>
        <Navbar/>
          <LoadingBar
          color='#f11946'
          progress={progress}
          />
          <Routes>
            <Route path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
            <Route path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
            <Route path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
            <Route path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
            <Route path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
            <Route path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
            <Route path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;
