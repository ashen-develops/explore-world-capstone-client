import React from 'react'
import TokenService from "../services/token-service"
import config from "../config"

class Suggestion extends React.Component {
    state = {
        for_place: '',
        suggestion: '',
      
        toggle:false,
        loggedIn: false,
    };

    componentDidMount(){
        let currentUserId = TokenService.getUserId()
        if (currentUserId){
            this.setState({loggedIn: true})
        }
        else if (!currentUserId){
            this.setState({loggedIn: false})
        }
    };

    logOutClick = () => {
        TokenService.clearAuthToken()
        window.location = '/home'
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

    handleSubmit = (e) => {
        e.preventDefault();
        const item = {
          for_place: this.state.for_place,
          suggestion: this.state.suggestion,
        };
        fetch(`${config.API_ENDPOINT}/suggestions`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((res) => {
            if (!res.ok) return res.json().then((e) => Promise.reject(e));
            return res.json();
          })
          .then(() => {
            window.location = "/select";
          })
          .catch((error) => {
            console.error({ error });
          });
      };

      handleChange(e) {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
      };

    render(){
        return (
            <div className="suggestion">
                {!this.state.loggedIn?
                <p>Please log in to make suggestions on future locations to be seen by the Stuff to Do community</p> : 
                <div>
                    <h2>Make Some Suggestions For Changes or Additions</h2>
                    <h3>Place With the Stuff to Do</h3>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            placeholder="City, State/ Providence" 
                            type="text"
                            id="for_place"
                            name="for_place"></input>

                        <h3>The Cool Stuff to Do</h3>
                        <input 
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Something really cool" 
                            type="text"
                            id="suggestion"
                            name="suggestion"></input>
                        <button type="submit">Suggest!</button>
                    </form>
                </div>}
            </div>
        );
    };
};

export default Suggestion;