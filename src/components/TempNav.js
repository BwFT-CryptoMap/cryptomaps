import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";


export default () => {

  return (
    <section>
      <header className={"navBar"}>
​
            <nav>
            
              
                <Link to="/">MarketCap</Link>
            
                <Link to="/liquid">Liquid MarketCap</Link>
           
              <Link to="/reported-volume">Reported Volume</Link>
           
              <Link to="/real-volume">Real Volume</Link>
              <Link to="/on-chain-volume">Transaction Volume (24H, USD)</Link>
            
              
          </nav>
​
      </header>
    </section>
  );
}


