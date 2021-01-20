import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Missouri extends React.Component {
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
                    <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M4.87,1C10.13.94,15.38.36,20.65.53c1.74.06,2.06.48,1.93,2.22a5.27,5.27,0,0,0,1.55,3.78c1.36,1.55,3.09,2.8,3.69,4.91.1.37.38.29.67.29,1.19,0,1.89.72,1.39,1.69-.95,1.82-.15,3,1.24,3.9A19.23,19.23,0,0,1,35.79,22a5.44,5.44,0,0,1,.94,4.71,1,1,0,0,1-.59.84,2.76,2.76,0,0,0-1.62,2.91v.72c0,1.58-.27,1.8-1.81,1.5-1.07-.22-1.26-.73-.55-1.58a1.38,1.38,0,0,0,.39-1.53,1.9,1.9,0,0,0-1.66-1.17,41.23,41.23,0,0,0-6,.28,38.12,38.12,0,0,1-4.26.4c-4.23.05-8.43.45-12.65.72-1.5.1-1.66,0-1.5-1.51a30.61,30.61,0,0,0,.45-5c-.2-4-.32-8-.47-12a1.06,1.06,0,0,0-.53-1A3,3,0,0,1,4.32,7C4.56,5.89,3.82,5.48,3,5.15A7.23,7.23,0,0,1,.5,1.49C.51.91.94,1,1.27,1c.6,0,1.2,0,1.8,0Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Missouri;;