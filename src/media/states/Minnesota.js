import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class Minnesota extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            //need to pass down current state from main component
            // currentState: null,
            error: '',
            allStates: [],
            stateObj: [],
            justCities: [],
            currentCity: null,
            setStates: () => {}
        }
    }
    handleChange(e){
        this.setState({ currentCity: e.currentTarget.value});
        console.log(this.state.currentCity)
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
            if (this.props.stateName === stateObj.state){
                result.push(stateObj)
            }
        })
        return this.setState({ stateObj: result })
    }
    
    //set state cities based on the cities under the name of the currentState
    setCities(cities) {
        let result = [];
        cities.forEach((city) => {
            result.push(city.city)
            // console.log(this.state)
        });
        return this.setState({ justCities: result })
    }

    componentDidMount() {
        // console.log(`${config.API_ENDPOINT}/states`)
        // this.separateStates(this.state.allStates)
        return fetch(`${config.API_ENDPOINT}/states`, {
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
            //   console.log(resJson)
              this.setStates(resJson)
              this.seperateCurrentStateObj(this.state.allStates);
            //   console.log("before", this.state)
              this.setCities(this.state.stateObj)
              console.log(this.state.justCities)
            //   console.log("after", this.state)
          })
          .catch(err => {
            console.log('error:', err)
          })     
    }

    handleSubmit = (e) => {
        e.preventDefault()
        window.location="/info"
    }

    renderCityInfo(){
        if (this.state.currentCity === null){
            return <p>Pick a City to see find some new places to go!</p>
        }
        else if (this.state.currentCity === '...'){
            return <p>Pick a City to see find some new places to go!</p>
        }
        else {
            return <CityInfo currentCity={this.state.currentCity} />
        }
    }

    render(){
        return(
            <div className="mainInfo">
                <select id="citySelect" name="citySelect" onChange={e => this.handleChange(e)}>
                    {this.props.stateName
                    ? <option key="..." value="...">...</option>
                    : null}
                    {/* once currentState is defined in state, this should work */}
                    {this.props.stateName
                    ? this.generateCitySelect(this.state.justCities)
                    : null}
                </select>
                <aside>
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M10.71,1.05c.8.77.54,1.54.56,2.23.06,2.21.23,2.49,2.3,3.16.95.3,1.91.54,2.87.82a1.56,1.56,0,0,0,1-.12c1.28-.52,2.61-.24,3.91-.26a.68.68,0,0,1,.52.24c.87,2,3.22,1.5,4.55,2.73.27.25.68,0,1,0,3-.16,6-1.13,9-.85a5.38,5.38,0,0,0,2.83-.32c.22-.1.49-.2.66,0s0,.51-.23.72a2.4,2.4,0,0,1-2,.94C34.38,10,32,11.71,29.86,14a35.75,35.75,0,0,1-3.73,3.33A5.86,5.86,0,0,0,23.92,22,4.67,4.67,0,0,1,22,25.54a1.08,1.08,0,0,0-.29,1.62A5.37,5.37,0,0,1,22,30.92a3,3,0,0,0,1.47,3.24,35,35,0,0,1,5.83,4.52,1.93,1.93,0,0,1,.71,1.2c.16,1.59-.07,1.76-1.66,1.91-3.7.34-7.42.19-11.11.41-2.48.14-4.94.13-7.42.16-1.47,0-2.93.33-4.41.25-.75,0-1-.28-1.09-1-.28-3.23-.24-6.47-.21-9.7A4.16,4.16,0,0,0,3,28.62c-.39-.37-.72-.88-.27-1.37,1.21-1.32.78-2.91.58-4.33q-.87-6.2-2.12-12.32A33.24,33.24,0,0,1,.5,5.65c0-.73.25-1,1-1,2.48,0,5,0,7.44,0,1,0,1.52-.17,1.49-1.3A15.57,15.57,0,0,1,10.71,1.05Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Minnesota;