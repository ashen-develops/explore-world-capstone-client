import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Utah extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M26.42,38.69c-2.66-.44-5.33-.86-8-1.31-2.15-.35-4.3-.74-6.46-1.09-2.34-.38-4.7-.69-7-1.1a24.37,24.37,0,0,0-2.83-.39c-1.47-.09-1.71-.53-1.54-2C1,29.13,1.72,25.46,2.38,21.79c.63-3.51,1.29-7,1.93-10.54C4.87,8.13,5.61,5,5.89,1.86,6,.7,6.46.33,7.67.57c4.25.85,8.56,1.27,12.85,1.85.83.12.74.6.67,1.1-.22,1.58-.4,3.16-.72,4.71-.22,1,.12,1.3,1.1,1.44,2.79.39,5.6.64,8.36,1.29.77.18,1,.5.88,1.21-.39,2.52-.63,5-1,7.56-.65,4.2-1.11,8.43-1.61,12.65-.23,1.9-.88,3.73-.73,5.67C27.49,38.8,26.9,38.7,26.42,38.69Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Utah;