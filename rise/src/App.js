import React from 'react';
import Landing from './components/landing'
import Splash from './components/Splash'
import Home from './components/home'
import News from './components/Newsfeed/newsfeed';
import Repo from './components/Report/Report';
import Vol from './components/volunteering/form';
import Description from './components/Newsfeed/desc'
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={< Splash/>} />
      <Route path="/landing"  element={<Landing />} />
      <Route path="/home"  element={<Home />} />
      <Route path="/home/desc/:id"  element={<Description />} />
      <Route path="/Newsfeed/newsfeed"  element={<News/>} />
      <Route path="/Report/Report"  element={<Repo/>} />
      <Route path="/volunteering/form"  element={<Vol/>} />
      {/* Add more routes as needed */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
