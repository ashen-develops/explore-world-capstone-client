import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class Florida extends React.Component {
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
        //console.log(this.state.currentCity)
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
            //console.log(this.state)
        });
        return this.setState({ justCities: result })
    }

    componentDidMount() {
        //console.log(`${config.API_ENDPOINT}/states`)
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
            //   //console.log(resJson)
              this.setStates(resJson)
              this.seperateCurrentStateObj(this.state.allStates);
            //   //console.log("before", this.state)
              this.setCities(this.state.stateObj)
              //console.log(this.state.justCities)
            //   //console.log("after", this.state)
          })
          .catch(err => {
            //console.log('error:', err)
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M32,16.23a4.1,4.1,0,0,0-.57-2.38c-.54-.76-1-1.3-2-1.14-.5.08-.78-.28-1.06-.64a13.89,13.89,0,0,0-5.16-4.46A2.59,2.59,0,0,0,20,8a25.51,25.51,0,0,1-2.52,2c-1.66,1.13-2.69,1-4-.58a6.67,6.67,0,0,0-.9-.94c-.37-.28-.61-.55-.19-1.07a1.75,1.75,0,0,0,0-2.31c-.66-.84-1.51-.48-2.3-.18a3.08,3.08,0,0,0-.49.34c-.52.35-1.15,1-1.66.29S8.14,4.34,8.63,4c1.27-.87,2.28-2.48,4.25-1.68.23.09.6-.17.9-.26a1.43,1.43,0,0,1,1.8.5A2.48,2.48,0,0,0,18,3.67,94.37,94.37,0,0,0,30.11,2.5a1.83,1.83,0,0,1,1.66.66c1.18,1,1.74.9,2.09-.59.08-.35.15-.7.21-1.06s-.13-.92.55-1a1.23,1.23,0,0,1,1.39.7c.79,1.69,1.53,3.4,2.38,5.06,1.54,3,3,6.05,5.68,8.27a1.77,1.77,0,0,1,.81,1.82A3,3,0,0,0,45.75,19a24.29,24.29,0,0,1,4.6,8.77,6.33,6.33,0,0,1-.5,5.09,4,4,0,0,0-.49,3.58,1,1,0,0,1-.59,1.46c-.21.1-.4.26-.6.38-1.87,1.19-2.39.94-3.28-1s-2-4-4.49-4.36a.52.52,0,0,1-.51-.4,4.57,4.57,0,0,0-2.72-3.2c-.13-.05-.34-.22-.33-.3.15-1.22-.92-1.37-1.58-1.89s-.83-1.73-1.43-2.44c-.79-.95-.27-1.72.06-2.55A.83.83,0,0,0,33.73,21c-.3-.24-.44.07-.67.23s-.25,1.26-.81.87a1.79,1.79,0,0,1-.95-2c.21-.73.41-1.46.55-2.2A15.45,15.45,0,0,0,32,16.23Z"/><path className="cls-1" d="M8.06,2.89A4.36,4.36,0,0,0,6.52,6c0,.51-.35.67-.71.38-.53-.43-.93-.26-1.38.09a5.3,5.3,0,0,1-2,.67C1.46,7.37.82,7.29,1,6.06a1.37,1.37,0,0,0-.14-.58C.29,4.13.29,4,1.78,3.75,3.76,3.41,5.77,3.2,8.06,2.89Z"/><path className="cls-1" d="M9.54,6.65c.68-.54,1.2-.92,1.85-.52a.53.53,0,0,1,0,.84C10.65,7.74,10.29,6.75,9.54,6.65Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Florida;