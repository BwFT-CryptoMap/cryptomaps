
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import TempNav from './components/TempNav';
import {  Route, Link, Switch, Redirect } from "react-router-dom";

import LiquidView from "./components/LiquidView";
import ReportedVolView from "./components/ReportedVolView";
import RealVolView from "./components/RealVolView";
import OnChainTransVolume from "./components/OnChainTransVolume";
import Github90D from "./components/Github90D"

import Blocklist from './components/TreeMap'
// import Header from './components/header'
import { getApiData } from './actions'

import CircularProgress from '@material-ui/core/CircularProgress'
import SectionView from './components/SectionView';

function App() {

  const dispatch = useDispatch();
  const isFetched = useSelector(state => state.isFetched)

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch(getApiData())
    }, 5000);
    return () => clearInterval(timer);
  }, [])

  return (
    <div>
      {/* <Header /> */}
      <TempNav />   
    
    <Switch>
      <Route exact path ="/" render= {() => !isFetched ? <CircularProgress /> : <Blocklist />} />
            <Route exact path="/liquid" render={() => <LiquidView/>} />
            <Route exact path="/reported-volume" render={() => <ReportedVolView/>}/>
            <Route exact path="/real-volume" render={()=> <RealVolView/>} />
            <Route exact path="/on-chain-volume" render={()=> <OnChainTransVolume/>} />
            <Route exact path="/github-commits90" render={()=> <Github90D/>} />
            <Route exact path="/sectionview" render={()=> <SectionView/>} />
        </Switch> 
      <footer className="App-footer"/>
        </div>
  );
}

export default App;