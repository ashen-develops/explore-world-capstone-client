
import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class Alaska extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M7,38.06c-1.48-.2-3.17.23-4.89.25a.93.93,0,0,1-1.09-1,53.78,53.78,0,0,1-.49-7.5c0-.88.33-1.33,1.26-1.35A1.61,1.61,0,0,0,3.18,26c-.72-1.09,0-1.7.48-2.37a12.12,12.12,0,0,1,1.57-1.46,2.36,2.36,0,0,1,2.22-.72,9.84,9.84,0,0,0,3.07-.31.84.84,0,0,0,.74-.82,5.89,5.89,0,0,1,.4-2.68c.24-.45-.27-.67-.72-.67-1,0-2.08,0-3.12,0-1.55-.05-2.08-.53-2.38-2A3.3,3.3,0,0,0,5,13.59c-.8-1-.07-1.23.67-1.4a25.76,25.76,0,0,1,2.59-.4c.46-.06.73.18.83.66.18,1,.93,1,1.67.94.41,0,1,.21,1.14-.35.17-.79.46-1.86-.28-2.36a4,4,0,0,1-1.38-1.95A13.37,13.37,0,0,0,8.93,6.08c-.62-.79-.09-1.16.64-1.31a9.57,9.57,0,0,1,1.2,0,2.37,2.37,0,0,0,2.09-1.15A3.52,3.52,0,0,1,16,1.83c1.16,0,2.12-.91,3.28-1.14.6-.13,1.1-.5,1.46.35a1.25,1.25,0,0,0,.77.53A10.27,10.27,0,0,1,24.39,3c.91.54,2.28.52,3.4.93,1.36.5,2.79.71,4.17,1.16a9.17,9.17,0,0,1,2.14,1.3c1.75,1.07,2,2.59,2,4.48,0,4.3.35,8.59.48,12.9.09,2.6.44,5.22.63,7.84,0,.41.09,1,.6.81,1.55-.51,2.38.63,3.36,1.36a26.43,26.43,0,0,0,2.22,2,.5.5,0,0,1,.26.61c-.13.34-.39.16-.59.06-1.05-.55-2.11-1.09-3.14-1.67-.17-.1-.24-.4-.33-.61-.21-.52-.48-.88-1.06-.44-.34.26-.64.14-1,.06-1.63-.37-3.26-.7-4.89-1A10.73,10.73,0,0,1,29.13,31c-1.19-.75-1.84-.59-2.29.69a1.06,1.06,0,0,1-.57.73c-1.27.41-2.07,1.44-3.07,2.2-.7.52-1,.39-1.14-.52s.39-1.86.52-2.79-.22-.86-.76-.57a4.13,4.13,0,0,0-1.3,1.2,4.83,4.83,0,0,1-2,1.86A1.18,1.18,0,0,0,18,35.62c.22.32.37.74,0,1-.93.69-1.49,1.94-2.86,2A1.61,1.61,0,0,0,14,39.3a6.5,6.5,0,0,1-3.42,2.24,2.4,2.4,0,0,0-1.06.76,3.28,3.28,0,0,1-.85.64c-.59.28-1.5.46-1.77,0-.39-.65.55-.9,1-1.22,1.42-1,3.21-1.51,4.28-3.12A4.58,4.58,0,0,0,12.91,36c0-1-1-1.06-1.82-1.07s-.82.52-.65,1.16a7.75,7.75,0,0,1,.09,1.19c.05.59-.24.77-.79.76C8.9,38,8.06,38.06,7,38.06Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default Alaska;