import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class Washington extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M33,25.75c-2.11-.39-4.22-.8-6.33-1.17a31.11,31.11,0,0,0-5.53-.8c-2,0-4.05-.35-6.09-.26-.75,0-1.3-.54-2-.68a20,20,0,0,0-5.45-.48c-.53,0-.82-.06-1-.71-.37-1.56-1.43-2.81-2.12-4.23-.16-.33-.43-.33-.7-.33a5.32,5.32,0,0,1-1.2,0c-.56-.17-1.29.59-1.68-.2a2.68,2.68,0,0,1,.25-3.09c.27-.33.53-.56.48-1-.12-1,.38-1.49,1.39-1.45.22,0,.53.09.61-.21s-.19-.39-.39-.51a1.07,1.07,0,0,1-.64-.94c.1-2.17-.47-4.28-.51-6.43,0-.43-.11-.94.39-1.16s.76.12,1.09.34a34.11,34.11,0,0,0,6,3c.82.36.81.65.28,1.27a1.67,1.67,0,0,0-.41,1.77,1.13,1.13,0,0,0,1.29.67,1.9,1.9,0,0,0,1.78-1.54c.52-2,.16-4.1.41-6.14.09-.73.3-.94,1-.92a25.1,25.1,0,0,1,5,.89c3.05.74,6.15,1.22,9.21,1.94,2.51.58,5.06,1,7.59,1.55,1.82.37,2.17,1,1.79,2.83-.59,2.79-1.08,5.61-1.6,8.42a78.36,78.36,0,0,0-1.31,8.35C34.5,25.53,34.07,26,33,25.75Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Washington;