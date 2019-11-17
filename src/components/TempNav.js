import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Filter by view
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
         <Link to="/">
          <MenuItem onClick={handleClose}>Reported MarketCap</MenuItem>
        </Link>
        <Link to="/liquid">
          <MenuItem onClick={handleClose}>Liquid MarketCap</MenuItem>
        </Link>
        <Link to="/reported-volume">
          <MenuItem onClick={handleClose}>Reported Volume</MenuItem>
        </Link>
        <Link to="/real-volume">
          <MenuItem onClick={handleClose}>Real Volume</MenuItem>
        </Link>
        <Link to="/on-chain-volume">
          <MenuItem onClick={handleClose}>Transaction Volume (24H, USD)</MenuItem>
        </Link>
        <Link to="/github-commits90">
          <MenuItem onClick={handleClose}>Github Commits (90D)</MenuItem>
        </Link>
        <Link to="/sectionview">
        <MenuItem onClick={handleClose}>Sectionview</MenuItem>
      </Link>
        
      </Menu>
      

    </div>
  );
}



// import React from "react";
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";


// export default () => {

//   return (
//     <section>
//       <header className={"navBar"}>
// ​
//             <nav>
            
              
//             <Link to="/">MarketCap</Link>
//               <Link to="/liquid">Liquid MarketCap</Link>
//               <Link to="/reported-volume">Reported Volume</Link>
//               <Link to="/real-volume">Real Volume</Link>
//               <Link to="/on-chain-volume">Transaction Volume (24H, USD)</Link>
//               <Link to="/github-commits90">Github Commits (90D)</Link>   
            
              
//           </nav>
// ​
//       </header>
//     </section>
//   );
// }




