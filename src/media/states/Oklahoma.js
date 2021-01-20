import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Oklahoma extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M17.09,10.94c0-1.76,0-3.52,0-5.28,0-.76-.26-1.1-1-1.09-4.71.11-9.39-.69-14.1-.5C.59,4.12.39,3.87.54,2.56.74.84,1.45.48,3.29.57a106.51,106.51,0,0,0,12.76,0,4.76,4.76,0,0,1,1.55,0,11.16,11.16,0,0,0,3.1.19c8.35,0,16.69.38,25,.23.94,0,1.38.11,1.15,1.28a5.64,5.64,0,0,0,.66,4,10.75,10.75,0,0,1,.9,3.68c.53,3.57,1,7.16,1.2,10.77a11.85,11.85,0,0,1-.28,2.84c-.19,1-.65,1.12-1.54.6a8.59,8.59,0,0,0-5.75-1,26.54,26.54,0,0,0-3.4.58,1.73,1.73,0,0,1-1.58-.35,2.11,2.11,0,0,0-2.55-.12,1.61,1.61,0,0,1-1.69,0c-.14-.07-.28-.2-.42-.21-1.8-.06-3.55-.23-4.9-1.65-.14-.15-.55-.1-.81,0-2.45.47-4.41-.87-6.5-1.72-.33-.14-.65-.31-1-.43-1.74-.6-2.12-1.08-2.16-3C17.06,14.46,17.09,12.7,17.09,10.94Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Oklahoma;