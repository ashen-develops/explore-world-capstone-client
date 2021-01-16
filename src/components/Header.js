import React from 'react';
import { Link } from 'react-router-dom';
import Vector1 from '../media/Vector1'
import Vector2 from '../media/Vector2'
import Vector3 from '../media/Vector3'
import Vector4 from '../media/Vector4'
import FancyUnder from '../media/FancyUnder'

class Header extends React.Component {
    
    render() {
        return (
            <div className="header">
                <header>
                    <h1>Stuff To Do</h1>
                    <FancyUnder />
                </header>
            </div>
        )
    }
}

export default Header;