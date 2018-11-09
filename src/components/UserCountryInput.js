import React from "react";
import {connect} from 'react-redux'
import Select from "react-select";

import {API} from '../gapi'
import {ADD_COUNTRIES, ADD_RESULTS, FLAGS_ROOT_URL} from '../constants'

const styles = {
    selectBox: {
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    flagOuter: {
        flexShrink: 1,
        width: 45,
        marginRight: 10,
    }
}

const SelectStyles = {
    control: (styles, { isFocused }) => {
        return {
            ...styles,
            backgroundColor: "white",
            border: "none",
            borderBottom: "2px solid #C6CED8",
            borderRadius: 0,
            outline: "none",
            boxShadow: "none",
            borderColor: "C6CED8",
            fontFamily: 'Montserrat, Sans-serif',
            fontSize: '16px'
        };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: (!isDisabled && (isSelected || isFocused)) && "#E6EEF9",
            color: "#111",
            cursor: isDisabled ? "not-allowed" : "default"
        };
    },
    input: styles => ({ ...styles, color: "blue" }),
    placeholder: styles => ({ ...styles })
};


class ComboBoxInput extends React.Component {

    constructor(props){
        super(props)
        this.state = { nationality: '' }
    }

    async fetchVisaInfo({nationality, dest}){
        try {
            const baseUrl = `/visas?citizenship=${nationality.countryCode.toUpperCase()}`
            let resp = await API.get({url: baseUrl + `&destination=${dest.countryCode}`})
            let body = await resp.json()
            if(body.results && body.results[0]) {
                return {
                    ok: true,
                    body: {
                        ...body.results[0],
                        destination: dest,
                        nationality
                    }
                }
            }
        } catch(err){
            return { ok: false, err }
        }
    }

    async checkForVisas(event){

        const {destinations, countries} = this.props

        // fetching too early, countries probably not loaded yet
        if(Object.keys(countries || {}).length == 0){
            return;
        }
        const nationality = countries[event.value]

        this.props.isLoading(true)

        const destinationCountries = destinations.map(d => countries[d])

        let payload = {}
        for(let dest of destinationCountries){
            if(dest.countryCode !== nationality.countryCode) {
                let resp = await this.fetchVisaInfo({dest, nationality})
                let key =  nationality.countryCode + '-' + dest.countryCode
                if(resp.ok){ payload[key] = resp.body }
                else { console.log('Problem finding visa', resp.err) }
            }
        }
        this.props.dispatch({ type: ADD_RESULTS, payload })
        this.props.isLoading(false)
    }

    componentDidMount() {
        const {countries, defaultNationality} = this.props
        const countryData = require('g-countries')
        if(defaultNationality && !this.state.nationality){
            let nationality = countryData[defaultNationality.toUpperCase()]
            this.setState({nationality})
        }
        if(!countries){
            this.props.dispatch({
                type: ADD_COUNTRIES,
                payload: { countries: countryData }
            })
        }
    }

    componentDidUpdate(prevProps){
        // if a default is set for nationality, wait til the countries are loaded,
        // then check for the visa. The countries shouldn't change since they
        // are statically loaded
        if(this.props.countries != prevProps.countries && this.state.nationality){
            this.checkForVisas({value: this.state.nationality.countryCode})
        }
    }

    render() {
        const {nationality} = this.state
        const countries = Object.values(this.props.countries || {}).map(c => ({
            label: c.nationality,
            value: c.countryCode,
        }))

        // make them alphabetical
        countries.sort((a, b) => (a.label > b.label ? 1 : -1))
        return (
            <div style={styles.selectBox}>
                {!!nationality && (
                    <div style={styles.flagOuter}>
                        <img src={`${FLAGS_ROOT_URL}/4x3/${nationality.flagSVG}`}/>
                    </div>
                )}
                {!!(countries && countries.length) &&
                    <div style={{flexGrow: 1}}>
                        <Select
                            defaultValue={countries.find(
                                c => nationality && c.value == nationality.countryCode
                            )}
                            styles={SelectStyles}
                            placeholder="Your Citizenship"
                            options={countries}
                            onChange={(e) => {
                                this.setState({nationality: this.props.countries[e.value]})
                                this.checkForVisas(e)
                            }}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default connect(({visachecker}) => ({
    countries: visachecker.countries,
}))(ComboBoxInput)
