import React from 'react';
import { Link } from 'react-router-dom';
import FancyUnder from '../media/FancyUnder'
import SupportIcon from '../media/SupportIcon'
import HomeIcon from '../media/HomeIcon'

class Header extends React.Component {

    takeHome() {
        window.location = '/select'
    }
    
    render() {
        return (
            <div className="header">
                <header>
                    <div className="headerAbove">
                        <Link to="/signup"  className="homeBtn">
                            <HomeIcon />
                        </Link>
                        <h1>Stuff To Do</h1>
                        <button className="supBtn">
                            <SupportIcon />
                        </button>
                    </div>
                    <div className="under">
                        <FancyUnder className="line"/>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;