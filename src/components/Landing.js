import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import SupportIcon from "../media/SupportIcon";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: {
        value: "",
      },
      password: {
        value: "",
      },
      loggedIn: false,
      hidden: true,
      LogInUserID: 0,
      error: null,
      params: {},
      formValidationError: "",
      emptyUserError: "",
      emptyPasswordError: "",
    };
  }

  componentDidMount() {
    let currentUserId = TokenService.getUserId();
    if (currentUserId) {
      this.setState({ loggedIn: true });
    } else if (!currentUserId) {
      this.setState({ loggedIn: false });
    }
  };

  validateloginPassword(inputloginPassword) {
    let outputloginPassword = inputloginPassword;
    // at least one number, one lowercase and one uppercase letter
    // at least eight characters that are letters, numbers or the underscore
    let loginPasswordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;

    if (!inputloginPassword.match(loginPasswordformat)) {
      outputloginPassword = "";
    }
    return outputloginPassword;
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = e.target;
    if (!this.state.userName) {
      return this.setState({ emptyUserError: "username cannot be empty" });
    } else if (!this.state.password) {
      return this.setState({ emptyPasswordError: "password cannot be empty" });
    }
    AuthApiService.postLogin({
      user_name: userName.value,
      password: password.value,
    })

      .then((res) => {
        userName.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserId(res.userId);
        window.location = "/select";
      })
      .then((res) => {
        //console.log('response:', res)
      })
      .catch((err) => {
        //console.log(err)
        //console.log(err.error)
      });
  };

  render() {
    let showErrorOutput = "";
    if (this.state.formValidationError) {
      showErrorOutput = (
        <div className="alert alert-info">
          <i className="fas fa-info"></i>
          <strong>Info</strong>
          {this.state.formValidationError}
        </div>
      );
    }

    return (
      <div>
        {this.state.loggedIn ? (
          <div>
            <main className="Landing">
              <div className="landing-buttons">
                <p className="req">
                  If you have any suggestions for new things and places just
                  click on this button:
                </p>
                <SupportIcon />
                <p>in the header</p>
              </div>
              <div className="landing-buttons">
                <p>Look at our currated list of Stuff To Do in cities accross the USA!</p>
                <div className="signup">
                    <Link className="signbtn abtn" to="/select">
                        Stuff To Do
                    </Link>
                </div>
                </div>
            </main>
          </div>
        ) : (
          <div>
            <main className="Landing">
              <div className="landing-buttons">
                <p className="req">
                  If you have any suggestions for new things and places just
                  click on this button:
                </p>
                <SupportIcon />
                <p>in the header</p>
                <div className="signup">
                  <Link className="signbtn abtn" to="/signup">
                    Sign Up
                  </Link>
                </div>
                <div>
                  <p className="req">
                    Must log in (either with your account or the demo account)
                    to make suggestions for future updates to the app
                  </p>
                </div>
              </div>

              <div className="login-form">
                <h2>Login</h2>

                {showErrorOutput}

                <p>If you're here to demo the app you can login with:</p>
                <p>u-demo : p-password</p>
                <form className="login" onSubmit={this.handleSubmit}>
                  <label htmlFor="user">Username:</label>
                  <input
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.user}
                    type="text"
                    id="userName"
                    name="userName"
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    type={this.state.hidden ? "password" : "text"}
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                    id="password"
                    name="password"
                  />

                  <label htmlFor="show-pwd">
                    <input
                      className="show-pwd"
                      type="checkbox"
                      id="show-pwd"
                      onChange={() => this.toggleShow()}
                    />
                    Show Password
                  </label>
                  <div className="container">
                    <div className="center">
                      <button className="btn" type="submit">
                        Login
                      </button>
                      <p className="error">{this.state.error}</p>
                    </div>
                  </div>
                </form>
              </div>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
