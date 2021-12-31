import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NotFound from './components/NotFound';

import Portfolios from './MyPortfolios'
import AddPortfolio from './AddPortfolio'
import UpdatePortfolio from './UpdatePortfolio'
import Protected from './Protected';

import Assets from './Assets';
import AddAsset from './AddAsset'
import UpdateAsset from  './UpdateAsset'

import Trades from './Trades'
import AddTrade from './AddTrade';

const rootElement = document.getElementById('root');

ReactDOM.render(
<BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route element={<NotFound />} />

      <Route path="/portfolios" element={<Protected cmp={Portfolios} role={"SimpleUser"}/>} />
        <Route path="/addPortfolio" element={<Protected cmp={AddPortfolio} role={"SimpleUser"}/>} />
        <Route path="/updatePortfolio/:id" element={<Protected cmp={UpdatePortfolio} role={"SimpleUser"}/>} />

        <Route path="/Assets" element={<Protected cmp={Assets} role={"SimpleUser"}/>} />
        <Route path="/AddAsset" element={<Protected cmp={AddAsset} role={"SimpleUser"}/>} />
        <Route path="/UpdateAsset/:id" element={<Protected cmp={UpdateAsset} role={"SimpleUser"}/>} />

        <Route path="/Trades" element={<Protected cmp={Trades} role={"SimpleUser"}/>} />
        <Route path="/AddTrade" element={<Protected cmp={AddTrade} role={"SimpleUser"}/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
  );

registerServiceWorker();