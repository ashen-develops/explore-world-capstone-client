import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service"

class Suggestion extends React.Component {
    state = {
      
      toggle:false,
      loggedIn: 'adsf'
    }

    componentDidMount(){
        let currentUserId = TokenService.getUserId()
        console.log(currentUserId)
        if (currentUserId){
            this.setState({loggedIn: 'Log Out'})
        }
        else if (!currentUserId){
            this.setState({loggedIn: 'Sign In/Up'})
        }
    }

    logOutClick = () => {
        console.log('Logging out')
        TokenService.clearAuthToken()
        TokenService.getUserId = (id) => {
            console.log(id)
        }

        window.location = '/home'
    }
    Toggle = () => {
      this.setState({toggle:!this.state.toggle})
    }
    LoggedIn = () => {
        if(this.state.loggedIn === 'Log Out'){
            this.setState({loggedIn: 'Sign In/Up'})
            this.logOutClick();
        }
        else{
            window.location = '/'
        }
        console.log(this.state)
    }
    render(){
        // let {currentUserId} = TokenService.getUserId
        return (
            <div>
                <p>TEST</p>
            </div>
        );
    }
}

export default Suggestion;