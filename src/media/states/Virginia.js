import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Virginia extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M.5,25.79A.82.82,0,0,1,1,25a17,17,0,0,0,4.47-4.89c.52-.74.95-.7,1.55-.21a2.27,2.27,0,0,0,2.76.16c.07,0,.14-.13.2-.13,1.92.1,3.23-1.49,5-1.76,1.55-.23,1.55-1.74,2-2.82.64-1.75,1.14-3.55,1.69-5.33.12-.41.38-.9.74-.84C21.15,9.5,21.28,7.92,21.9,7a12,12,0,0,1,1.32-1.93,2.68,2.68,0,0,0,.48-2c0-1.11.38-1.36,1.42-1,.41.15.84.24,1.25.37,1.05.32,1.58.14,1.38-1.09-.07-.43.23-.65.6-.76a.75.75,0,0,1,.94.29c.43.6.86,1,1.6.27a1,1,0,0,1,1.44,0c.5.56,1.24,1.05,1.11,2-.29,2.29,0,2.76,2,3.86.66.36,1.22.73.84,1.76a3,3,0,0,0,.1,2.27c.55,1,0,2.14.86,3,.24.22.11.55-.26.59s-.6.31-.57.73A5.63,5.63,0,0,0,39,18c.5.07,1.17,0,1.18.68s-.53,1.08-1.23,1.2c-2.82.47-5.64.92-8.44,1.46-2.34.46-4.7.79-7,1.28-1.51.31-3,.69-4.52,1a81.21,81.21,0,0,1-8.32,1.29c-3.17.3-6.33.58-9.49,1A3.7,3.7,0,0,1,.5,25.79Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Virginia;