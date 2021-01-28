import React from 'react';
import ApiContext from '../../ApiContext';
import CityInfo from '../../components/CityInfo';
import config from '../../config'



class NewYork extends React.Component {
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
                    <svg className="stateSVG" xmlns="http://www.w3.org/2000/svg"  viewBox="-25 -25 75 75"><path className="cls-1" d="M33.15,16.92c0,2.78.51,5.34.55,7.92,0,1.38.29,2.83-.72,4.1-.41.52-.5.72-.82,0-.2-.44-.48-.84-.65-1.28a1.68,1.68,0,0,0-1.26-1.14c-1-.24-2-.58-3-.79a3.17,3.17,0,0,1-2.16-2,1.69,1.69,0,0,0-1.7-1,22.65,22.65,0,0,0-5.44.62c-1.9.44-3.83.71-5.74,1.1-1.51.31-3,.71-4.5,1s-3.26.75-4.9,1c-1.06.19-1.64-.65-2.22-1.34-.26-.31,0-.61.33-.89C2.19,23.11,3.36,21.9,3.52,20a2,2,0,0,0-.38-1.53c-.74-1-.43-1.76.67-2.28a41.8,41.8,0,0,1,6.71-2.38,23.9,23.9,0,0,0,2.56-.55c.78-.32,1.31-.83,1.29-1.53-.14-3.4,2.3-5.5,3.85-8.06C19.27,2,20.87,1.5,22.74,1.35a41.6,41.6,0,0,0,4.57-.8C28.67.3,29,1,29.15,1.87a54.21,54.21,0,0,0,3.68,11.8A6.66,6.66,0,0,1,33.15,16.92Z"/><path className="cls-1" d="M34.21,31.59c-.4,0-.86,0-1-.48s.4-.55.72-.75c1.23-.76,2.74-.79,3.94-1.61a1.15,1.15,0,0,1,1-.18c.25.09.56.15.63.48a.58.58,0,0,1-.33.6A11.41,11.41,0,0,1,34.21,31.59Z"/><path className="cls-1" d="M41.13,26.81c.35.08.88-.08.8.37-.16.89-1.09.9-1.72,1.2-.23.11-.86-.12-.71-.54A1.74,1.74,0,0,1,41.13,26.81Z"/></svg>
                </aside>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                {this.renderCityInfo()}
            </div>
        )
    }
}

export default NewYork;