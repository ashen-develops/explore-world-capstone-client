import React from "react";
import ApiContext from "../../ApiContext";
import CityInfo from "../../components/CityInfo";
import config from "../../config";


class Alabama extends React.Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      //need to pass down current state from main component
      // currentState: null,
      error: "",
      allStates: [],
      stateObj: [],
      justCities: [],
      currentCity: null,
      setStates: () => {},
    };
  }
  handleChange(e) {
    this.setState({ currentCity: e.currentTarget.value });
    //console.log(this.state.currentCity);
  }

  generateCitySelect(cities) {
    let result = cities.map((city, key) => {
      return (
        <option key={key} value={city}>
          {city}
        </option>
      );
    });
    return result;
  }

  setStates = (states) => {
    this.setState({ allStates: states });
  };

  //seperate the two objects into their own state component that match currentState
  seperateCurrentStateObj(stateObjs) {
    let result = [];
    stateObjs.forEach((stateObj) => {
      if (this.props.stateName === stateObj.state) {
        result.push(stateObj);
      }
    });
    return this.setState({ stateObj: result });
  }

  //set state cities based on the cities under the name of the currentState
  setCities(cities) {
    let result = [];
    cities.forEach((city) => {
      result.push(city.city);
      //console.log(this.state)
    });
    return this.setState({ justCities: result });
  }

  componentDidMount() {
    //console.log(`${config.API_ENDPOINT}/states`)
    // this.separateStates(this.state.allStates)
    return fetch(`${config.API_ENDPOINT}/states`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((resJson) => {
        //   //console.log(resJson)
        this.setStates(resJson);
        this.seperateCurrentStateObj(this.state.allStates);
        //   //console.log("before", this.state)
        this.setCities(this.state.stateObj);
        //console.log(this.state.justCities);
        //   //console.log("after", this.state)
      })
      .catch((err) => {
        //console.log("error:", err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    window.location = "/info";
  };

  renderCityInfo() {
    if (this.state.currentCity === null) {
      return <p>Pick a City to see find some new places to go!</p>;
    } else if (this.state.currentCity === "...") {
      return <p>Pick a City to see find some new places to go!</p>;
    } else {
      return <CityInfo currentCity={this.state.currentCity} />;
    }
  }

  render() {
    return (
      <div className="mainInfo">
        <div>
          <select
            id="citySelect"
            name="citySelect"
            onChange={(e) => this.handleChange(e)}
          >
            {this.props.stateName ? (
              <option key="..." value="...">
                ...
              </option>
            ) : null}
            {/* once currentState is defined in state, this should work */}
            {this.props.stateName
              ? this.generateCitySelect(this.state.justCities)
              : null}
          </select>
          <aside className="cityInfo">
            <svg
              className="stateSVG"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-25 -25 75 75"
            >
              <path
                className="cls-1"
                d="M.52,13.82c0-3.67,0-7.35,0-11,0-.8.26-1.22,1-1.28,3.61-.29,7.18-.95,10.8-1,1.9,0,2,.13,2.53,1.9.79,2.77,1.62,5.53,2.54,8.27A10.62,10.62,0,0,1,18,12.72c.19,1.68,1.66,2.69,2,4.26a2.67,2.67,0,0,1,0,1.51,7.2,7.2,0,0,0,.35,4.77A14.88,14.88,0,0,1,20.87,26c.12.67-.31.93-.88,1a58.58,58.58,0,0,1-6.11,1c-2.55.18-5,.82-7.59.84-.82,0-1.12.95-.41,1.57a2.07,2.07,0,0,1,.47,2.77c-.12.27-.1.66-.56.65s-.55-.23-.73-.52c-.3-.47-.64-.91-.93-1.38-.18-.29-.35-.57-.74-.47a.7.7,0,0,0-.49.74c0,.51.06,1.13-.73,1.12s-.62-.65-.71-1.15C.31,26.11.51,20,.52,13.82Z"
              />
            </svg>
          </aside>
        </div>
        {/* <button onClick={this.handleSubmit}>Submit</button> */}
        {this.renderCityInfo()}
      </div>
    );
  }
}

export default Alabama;
