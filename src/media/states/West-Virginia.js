import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class WestVirginia extends React.Component {
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
        let result = [];
        cities.forEach((city) => {
            result.push(<ListOfCities city={city} />)
        });
        return result
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
            <div>
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M15.32,15.05c-.57,1.92-.75,4.09-3.14,4.84-.79.24-1.29.95-2,1.3-1.55.76-4.27,1.44-5.7,0a20.66,20.66,0,0,1-2.73-3c-.29-.43-.52-.9-.78-1.35-.53-.91-.88-1.73.36-2.45.81-.47.6-1.51.85-2.29.08-.26,0-.7.1-.81C4,10.09,4.12,7.44,6.5,6.71A2.84,2.84,0,0,0,8.24,4.17a12.12,12.12,0,0,1,.59-2.7c.21.59.42,1.18.62,1.78a.81.81,0,0,0,.88.65,9.89,9.89,0,0,1,1.44,0l.7,2.83c.62.39,1.66-1,4.7-2.54,0,0,4.31-2.19,6.53-1.17a3,3,0,0,1,.7.44c.36.28.81.63.83,1.13a1,1,0,0,1-.1.47.74.74,0,0,1-.3.35c-.26.13-.47,0-1.19-.16-.53-.09-.64,0-.69,0s-.08.16-.14.64-.09.65-.17.73-.27.09-.52.09a7.63,7.63,0,0,0-1.07.12c-.51.1-.79.67-1.32,1.78s-.77,1.55-1.34,2.64a.76.76,0,0,1-.42.41c-.14,0-.23,0-.5,0a2.49,2.49,0,0,0-.67,0c-.34.08-.53.47-.71.91-.51,1.29-.6,2.36-.68,2.36s-.06-.18-.08-.95"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default WestVirginia;