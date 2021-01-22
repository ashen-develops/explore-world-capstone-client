import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Oregon extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M.54,24.58A7.19,7.19,0,0,1,2.4,19.79c1.7-2.24,2-4.76,2.25-7.39,0-.47.15-.94.23-1.41,0-.26.19-.53.43-.51,1.34.14,1.48-1,1.83-1.78C8.21,6.24,9.35,3.8,10.2,1.24c.26-.8,2-1,2.83-.43,1.18.77,1.38,2,1.62,3.19.07.35.13.7.22,1,.19.76.37,1,1.38.69A5.18,5.18,0,0,1,21,6.52a3.1,3.1,0,0,0,1.56.5A93.17,93.17,0,0,0,32,7.25a19.55,19.55,0,0,1,4.7.76,34.25,34.25,0,0,0,4.68.92c1.69.16,2.36,1.47,3.2,2.6a.8.8,0,0,1-.07.81c-.78,1.46-1.47,3.17-2.78,4.05-2,1.33-2.1,2.72-1.47,4.76.51,1.62-.46,3.2-.94,4.73a24,24,0,0,0-1.09,4.73c-.18,1.71-.78,3.34-.83,5.06,0,.69-.43.93-1.16.74-2.45-.66-4.89-1.41-7.38-1.85s-4.78-1.12-7.18-1.66S16.82,31.6,14.35,31q-6-1.39-12.1-2.64c-1-.21-1.62-.56-1.5-1.68C.83,25.94.36,25.23.54,24.58Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Oregon;