import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Arizona extends React.Component {
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
                    <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M37.74,5.89c-.63,2.23-.64,4.88-1,7.48q-.55,4.19-1.1,8.38c-.43,3.35-.86,6.7-1.27,10.05-.39,3.15-.76,6.3-1.14,9.46,0,.19,0,.4,0,.59-.27,1.94-.5,2-2.4,1.59A20.5,20.5,0,0,0,26.68,43a20.59,20.59,0,0,1-9.38-2.45,21.05,21.05,0,0,1-3.61-2.38c-2.27-1.92-5.17-2.56-7.62-4.09a41.23,41.23,0,0,0-4.49-2.64,2.41,2.41,0,0,1-.86-.82c-.34-.47-.33-1,.36-1A1,1,0,0,0,2,28.23c-.69-2.29.52-3.85,1.65-5.64.72-1.14,1.19-2.35,2.43-3.05.33-.19.26-.53.13-.86C5.56,17.05,5.56,15.25,5,13.6c-.39-1.15.48-2,.46-3.13a23.09,23.09,0,0,1,.42-3.18c.11-.85.47-1.19,1.37-1,1.66.43,2.18,0,2.48-1.8.19-1.13.48-2.25.67-3.39.1-.6.42-.7.93-.61C14.15,1,17,1.61,19.78,2c4,.59,8,1.08,11.93,1.59A45.33,45.33,0,0,0,37,4.41C37.63,4.42,37.84,5,37.74,5.89Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Arizona;;