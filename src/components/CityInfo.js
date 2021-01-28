import React from 'react';
import config from '../config'

class CityInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            cityObject: {},
            cityObjectResults: [],
            bcbsLink: "placeholder",
            blffsLink: "placeholder",
            bdfsLink: "placeholder",
            bosLink: "placeholder",
        };
    };

    seperateCurrentCityObj(cityObjs) {
        cityObjs.forEach((cityObj) => {
            if (this.props.currentCity === cityObj.city){
                return this.setState({ cityObject: cityObj })
            }
        });
    };

    // On component mount have all state info go into allStates
    componentDidMount() {
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
            console.log(resJson)
            this.setState({ cityObjectResults: resJson })
            this.seperateCurrentCityObj(resJson)
            this.setBcbsLink()
            this.setBdfsLink()
            this.setBosLink()
            this.setBlffsLink()
          })
          .catch(err => {
            console.log('error:', err)
          });
          
    };

    //CREATE A COMPONENT DID UPDATE HERE FOR WHEN CITY IS CHANGED WITHOUT STATE
    componentDidUpdate(prevProps) {
        if (prevProps.currentCity !== this.props.currentCity) {
            this.seperateCurrentCityObj(this.state.cityObjectResults)
            this.setBcbsLink()
            this.setBdfsLink()
            this.setBosLink()
            this.setBlffsLink()
        }
    };


    setBcbsLink() {
        if(this.state.bcbsLink.includes("http")){
            return this.setState({ bcbsLink: this.state.cityObject["bcbs-link"].replace(" ", "")})
        }
        else{
            return this.setState({ bcbsLink: this.state.cityObject["bcbs-link"]})
        }
    };
    setBdfsLink() {
        if(this.state.bdfsLink.includes("http")){
            return this.setState({ bdfsLink: this.state.cityObject["bdfs-link"].replace(" ", "")})
        }
        else{
            return this.setState({ bdfsLink: this.state.cityObject["bdfs-link"] })
        }
    };
    setBosLink() {
        if(this.state.bosLink.includes("https")){
            return this.setState({ bosLink: this.state.cityObject["bos-link"].replace(" ", "")})
        }
        else{
            return this.setState({ bosLink: this.state.cityObject["bos-link"] })
        }
    };
    setBlffsLink() {
        if(this.state.blffsLink.includes("http")){
            return this.setState({ blffsLink: this.state.cityObject["blffs-link"].replace(" ", "")})
        }
        else{
            return this.setState({ blffsLink: this.state.cityObject["blffs-link"] })
        }
    };
    bcbsAddressVSHtml(){
        if(this.state.bcbsLink.includes("http")){
            return <a target="_blank" rel="noreferrer" href={this.state.bcbsLink.replace(" ", "")}>{this.state.cityObject["best-cheap-beer-spot"]}</a>
        }
        else {
            return(
                <div>
                    <p>{this.state.cityObject["best-cheap-beer-spot"]}</p>
                    <p>Address: <span>{this.state.bcbsLink}</span></p>
                </div>
            ) 
        }
    };
    bdfsAddressVSHtml(){
        if(this.state.bdfsLink.includes("http")){
            return <a target="_blank" rel="noreferrer" href={this.state.bdfsLink.replace(" ", "")}>{this.state.cityObject["best-dog-friendly-spot"]}</a>
        }
        else {
            return(
                <div>
                    <p>{this.state.cityObject["best-dog-friendly-spot"]}</p>
                    <p>Address: <span>{this.state.bdfsLink}</span></p>
                </div>
            ) 
        }
    };
    bosAddressVSHtml(){
        if(this.state.bosLink.includes("http")){
            return <a target="_blank" rel="noreferrer" href={this.state.bosLink.replace(" ", "")}>{this.state.cityObject["best-outdoorsy-spot"]}</a>
        }
        else {
            return(
                <div>
                    <p>{this.state.cityObject["best-outdoorsy-spot"]}</p>
                    <p>Address: <span>{this.state.bosLink}</span></p>
                </div>
            ) 
        }
    };
    blffsAddressVSHtml(){
        if(this.state.blffsLink.includes("http")){
            return <a target="_blank" rel="noreferrer" href={this.state.blffsLink.replace(" ", "")}>{this.state.cityObject["best-local-fast-food-spot"]}</a>
        }
        else {
            return(
                <div>
                    <p>{this.state.cityObject["best-local-fast-food-spot"]}</p>
                    <p>Address: <span>{this.state.blffsLink}</span></p>
                </div>
            ) 
        }
    };

    render() {
        return(
            <div className="cityInfoPage">
                <h2>Stuff To Do in, {this.props.currentCity}</h2>
                <h3>Best Cheap Beer Spot</h3>
                {this.bcbsAddressVSHtml()}

                <h3>Best Dog Friendly Spot</h3>
                {this.bdfsAddressVSHtml()}

                <h3>Best Outdoorsy Spot</h3>
                {this.bosAddressVSHtml()}

                <h3>Best Local Fast Food Spot</h3>
                {this.blffsAddressVSHtml()}

            </div>
        );
    };
};

export default CityInfo