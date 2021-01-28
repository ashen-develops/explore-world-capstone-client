import React from 'react';
import { Link } from 'react-router-dom';
import FancyUnder from '../media/FancyUnder'
import SupportIcon from '../media/SupportIcon'
import HomeIcon from '../media/HomeIcon'
import config from '../config'
import TokenService from '../services/token-service';

class Header extends React.Component {
    state = {
        toggle: false,
        loggedIn: 'adsf',
        user: ''
    };

    componentDidMount() {
        let currentUserId = TokenService.getUserId()
        if (currentUserId){
            this.setState({loggedIn: 'Log Out'})
        }
        else if (!currentUserId){
            this.setState({loggedIn: 'Sign In/Up'})
        }

        return fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId()}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          })
          .then(res =>
            (!res.ok) ?
            res.json().then(e => Promise.reject(e)) :
            res.json()
          )
          .then((resJson) => {
            this.setState({ user: resJson.user_name })
          })
          .catch(err => {
            console.log('error:', err)
          });
          
    };

    logOutClick = () => {
        TokenService.clearAuthToken()

        window.location = '/select'
    };
    
    Toggle = () => {
      this.setState({toggle:!this.state.toggle})
    };
    LoggedIn = () => {
        if(this.state.loggedIn === 'Log Out'){
            this.setState({loggedIn: 'Sign In/Up'})
            this.logOutClick();
        }
        else{
            window.location = '/'
        }
    };
    
    render() {
        return (
            <div className="header">
                <header>
                    <div className="headerAbove">
                        <Link to="/"  className="homeBtn">
                            <HomeIcon />
                        </Link>
                        <div className="hTitle">
                            <h1>Stuff To Do</h1>
                            {TokenService.getUserId() ? <p className="logged-as">Logged in as, {this.state.user}</p> : <p className="logged-as">Not currently logged in</p>}
                            {/* <p>Logged in as, {this.state.user}</p> */}
                            <div className="logged-in">
                                <button className="logged-in-btn" onClick={this.LoggedIn}>{this.state.loggedIn}</button>
                            </div>
                        </div>
                        <Link to="/suggestions" className="supBtn">
                            <SupportIcon />
                        </Link>
                    </div>
                    <div className="under">
                        <FancyUnder className="line"/>
                    </div>
                </header>
            </div>
        );
    };
};

export default Header;