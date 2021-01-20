import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Hawaii extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M27.75,13.08a1.64,1.64,0,0,0,.93,1.65,5.14,5.14,0,0,1,1.63,2.13c.3.5-.07.8-.4,1A29.55,29.55,0,0,0,25.74,20c-.55.4-1.08-.09-1.2-.72-.27-1.59-.72-3.16-.27-4.81.24-.9.5-1.55,1.62-1.3a2.5,2.5,0,0,0,.71-.06A1.58,1.58,0,0,0,27.75,13.08Z"/><path className="cls-1" d="M20.94,8.85c.61,0,1.23.11,1.29.79s-.57.63-1,.62A1.12,1.12,0,0,1,20,9.19C20,8.63,20.64,9,20.94,8.85Z"/><path className="cls-1" d="M10.85,5.93c-.47,0-.93,0-.94-.63a1,1,0,0,1,1-1.12c.53,0,.68.71.77,1.16S11.26,5.93,10.85,5.93Z"/><path className="cls-1" d="M2.36,1.18c-.08.54-.37.91-.93.89A.86.86,0,0,1,.5,1.19C.49.7.82.49,1.28.5S2.25.55,2.36,1.18Z"/><path className="cls-1" d="M16.89,9c.56.16,1.12.24,1.26.83.09.39-.23.44-.52.45a1,1,0,0,1-1-.81C16.57,9.24,16.62,9,16.89,9Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Hawaii;