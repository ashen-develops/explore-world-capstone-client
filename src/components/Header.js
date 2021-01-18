import React from 'react';
import { Link } from 'react-router-dom';
import FancyUnder from '../media/FancyUnder'

class Header extends React.Component {
    
    render() {
        return (
            <div className="header">
                <header>
                    <h1>Stuff To Do</h1>
                    <div className="under">
                        <FancyUnder className="line"/>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;