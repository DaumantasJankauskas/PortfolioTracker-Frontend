import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Layout } from './components/Layout';
import Snowfall from 'react-snowfall';

function App() {
  return (
    <div className="App">
      <Layout />
      <Snowfall />
    </div>
  )
}

export default App;
