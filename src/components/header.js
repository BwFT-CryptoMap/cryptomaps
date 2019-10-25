import React, { useState } from 'react'
import TempNav from './TempNav'
import Dialog from '@material-ui/core/Dialog'
import '../landing.css'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default () => {
    const [dialogsOpen, setDialogsOpen] = useState({ 'signup': false, 'login': false })

    const toggleOpen = type => {
        setDialogsOpen({ ...dialogsOpen, type: dialogsOpen[type] = !dialogsOpen[type] })
    }

    const handleLoginClose = () => {
        toggleOpen('login')
    }

    const handleSignupClose = () => {
        toggleOpen('signup')
    }

    return (
        <header>
            <div className="content">
                <div>
                    <a href="https://messari.io/" className="messariLogo">
                        <img src={require("../images/messari-Icon.svg")} alt="Messari Logo"></img>
                    </a>
                    <a href="https://messari.io" className="homeLogo">
                        <img src={require("../images/messari_home_logo.png")} alt="Messari Logo"></img>
                    </a>
                </div>
                <nav>
                    <a href="https://cryptomap.netlify.com/index.html" className="hov ">Home</a>
                    <a href="https://messarimaps.netlify.com/" className="hov active">CryptoMap</a>
                    <a href="https://cryptomap.netlify.com/about.html" className="hov">About</a>
                  
                </nav>
                <div className="searchCont">
                    <div className="inputCont">
                        <form>
                            <button type="button" name="search" placeholder="Search the Messari database"></button>
                        </form>
                    </div>

                </div>
                <div className="loginSignUp">
                    <button onClick={() => toggleOpen('login')} className="loginBtn">
                        <span>Login</span>
                    </button>
                    <button onClick={() => toggleOpen('signup')} className="signUpBtn">
                        <span>Sign Up</span>
                    </button>
                </div>
            </div>

            <Dialog onClose={handleLoginClose} open={dialogsOpen['login']}>
                <LoginForm />
            </Dialog>
            <Dialog onClose={handleSignupClose} open={dialogsOpen['signup']}>
                <SignupForm />
            </Dialog>
        </header>
    )
}
