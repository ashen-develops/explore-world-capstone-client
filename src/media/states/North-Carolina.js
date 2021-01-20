import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class NorthCarolina extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M43.31,13.66a4.13,4.13,0,0,0-3.64,1.88A8.56,8.56,0,0,0,38,18.94a1.84,1.84,0,0,1-1.48,1.66,12.72,12.72,0,0,0-1.79.64.81.81,0,0,1-1-.32c-1.81-2.15-4.34-3.33-6.61-4.85A1.4,1.4,0,0,0,26,15.92a23.4,23.4,0,0,1-2.57.52c-1,.12-2.15.57-2.77-.82a1.09,1.09,0,0,0-.92-.5,22.82,22.82,0,0,0-5.83.35A47.09,47.09,0,0,0,8,17.53c-1.25.5-2.68.15-4,.42a11.39,11.39,0,0,0-2.58.42c-.26.11-.57.18-.77-.09s0-.55.13-.78.33-.56.55-.6c1.77-.35,2.1-2.29,3.51-3.09S7.36,12,8.66,11.07a4.22,4.22,0,0,1,1.27-.64,6.43,6.43,0,0,0,3.84-3.31A2.76,2.76,0,0,1,16,5.72c3.53-.48,7-1.09,10.54-1.87,1.63-.36,3.28-.63,4.91-1C33.61,2.48,35.79,2,38,1.64c1.84-.31,3.66-.66,5.47-1.1a1.37,1.37,0,0,1,1.38.53,8.64,8.64,0,0,0,.76.92c.7.58,1.92,1.14,1.76,1.94a8.37,8.37,0,0,1-1.5,3.83c-.73.91-1.72.87-2.73.87-.52,0-1.19-.26-1.53.37s.27,1,.57,1.45c.47.71,1,1.36,2,1.34.64,0,.73.55.7,1s-.26.93-.91.83A4,4,0,0,0,43.31,13.66Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default NorthCarolina;