import React from "react";
import config from "../config";
import ApiContext from "../ApiContext";


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      user: "",
      password: "",
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  // handleLoginSuccess = user => {
  //     window.location = '/homePage'
  //   }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      user_name: this.state.user,
      password: this.state.password,
    };
    fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((user) => {
        this.context.addUser(user);
        this.props.history.push(`/api/users/${user.id}`);
        window.location = "/select";
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  };

  handleChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <main>
          <div className="signup">
            <h2>Create Account</h2>
            <form className="signup-form">
              <label htmlFor="user">Create Username:</label>
              <input
                onChange={(e) => this.handleChange(e)}
                type="username"
                id="user"
                name="user"
              />
              <label htmlFor="password">Create Password:</label>
              <input
                onChange={(e) => this.handleChange(e)}
                type={this.state.hidden ? "password" : "text"}
                value={this.state.password}
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
                  <button onClick={(e) => this.handleSubmit(e)} className="btn">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  };
};

export default SignUp;
