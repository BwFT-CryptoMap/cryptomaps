import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CoinList} from './components'
import Blocklist from './components/TreeMap'
import TreeMap from './components/TreeMap';

function App() {
  return (
    <div>
    {/* <CoinList/> */}
    <TreeMap/>
    </div>
  );
}

export default App;
