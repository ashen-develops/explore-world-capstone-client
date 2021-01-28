import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class Idaho extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M18.43,26.65c1.79,0,2,.11,2.5,1.84s.77,3.5,2.16,4.82a1.28,1.28,0,0,1,.35.87c0,1.18.75,1.37,1.67,1.33,2.37-.1,4.79.48,7.09-.58.46-.21.7,0,.68.48,0,.66.19,1.37-.42,1.91-.29.27-.22.66-.25,1a141.48,141.48,0,0,1-1.66,14.21c-.15.85-.52,1.08-1.27,1-2.88-.37-5.75-.77-8.6-1.31-3-.58-6.12-.95-9.14-1.64-3.47-.8-7-1.26-10.48-2.1a.65.65,0,0,1-.56-.77,13.32,13.32,0,0,1,.14-1.55C1.3,42.38,2.07,38.62,3,34.89c.34-1.31-.22-2.6-.12-3.92a1.89,1.89,0,0,1,.68-1.53C5.44,28,6.31,25.76,7.63,23.88a.79.79,0,0,0-.18-1C6.18,21.45,6.13,19.74,6.36,18,7,12.83,8.25,7.81,9.22,2.73A5.91,5.91,0,0,1,9.41,2C10,.26,10,.26,11.82.87c2.16.72,2.21.73,1.69,3a12,12,0,0,0,.08,6.33,17.47,17.47,0,0,0,3,5.77,24.34,24.34,0,0,0,1.64,2.18c.81.79.52,1.78.12,2.67a20.27,20.27,0,0,0-1.39,5C16.8,26.59,17,26.66,18.43,26.65Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Idaho;