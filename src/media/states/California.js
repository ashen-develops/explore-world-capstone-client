import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class California extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 0 75 75"><path className="cls-1" d="M10.35,52.29A5.82,5.82,0,0,0,9.73,50C8.35,47.49,6.8,45,6.34,42.18A4.39,4.39,0,0,1,6.92,39a1.09,1.09,0,0,0-.24-1.65,5.85,5.85,0,0,1-1.87-4.58,4,4,0,0,0-1.37-3.29c-.51-.44-.59-.76-.09-1.36,1.11-1.33.93-2.05-.5-3A4.15,4.15,0,0,1,.93,21.76,11.24,11.24,0,0,1,2,16.21a3.19,3.19,0,0,0-.42-3.58C.09,10.79.17,9.7,1.65,7.87A12.65,12.65,0,0,0,3.56,3.42,7.59,7.59,0,0,0,4.34.81c0-.37.35-.33.65-.27,1.9.4,3.81.78,5.71,1.2,2.76.6,5.52,1.19,8.26,1.85,1.72.42,3.42,1,5.14,1.43a.68.68,0,0,1,.55.89q-.63,3-1.3,6.05c-.58,2.59-1.12,5.19-1.8,7.75a26.6,26.6,0,0,1-1.2,4.58c-.63,1.32.26,2.3.89,3.27,1.64,2.48,3.35,4.91,5,7.39a7.32,7.32,0,0,1,1.21,3.39,4.29,4.29,0,0,0,2.5,3.43c1.63.63,2.25,1.93,3.1,3.11,3.08,4.28,5.93,8.74,9.5,12.65,1.32,1.44,1.42,3.33,2.06,5,0,.15,0,.36.06.47,1.26,1.7.07,2.74-1,3.86s-1.77,2.87-2.78,4.23c-.51.7-.06,1.68.39,2.36.65,1,.29,1.26-.67,1.65-1.43.57-2.71,0-3.94-.36A30.59,30.59,0,0,0,28,74.15c-1.27,0-1.73-.41-1.91-1.67a46.19,46.19,0,0,0-1.25-5.69c-.43-1.54-1.84-2.16-3.15-2.7a1.46,1.46,0,0,1-1.06-1.38c0-.42,0-.89-.52-1-2-.26-3-1.86-4.19-3.11-.51-.51-.9-1.25-1.83-1.12a.28.28,0,0,1-.33-.37c.29-1.63-.71-.63-1.22-.58-.13,0-.29.26-.37.23-1.1.29-3.12,0-2.77-.86C9.92,54.55,10.6,54.06,10.35,52.29Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default California;