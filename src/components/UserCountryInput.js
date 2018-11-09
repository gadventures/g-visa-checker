import React from "react";
import {connect} from 'react-redux'
import Select from "react-select";
import styled from "styled-components";

import {API} from '../gapi'
import {ADD_COUNTRIES, ADD_RESULTS, FLAGS_ROOT_URL} from '../constants'


// Styles
const ComboboxInputStyled = styled.div`
    font-family: Sans-serif;
`;

const HeaderStyled = styled.div`
    font-size: 0.9em;
    font-family: Montserrat, Sans-serif;
    font-weight: 400;

    p {
        padding: 0 0 5px;
        margin: 0;
    }
`;

const SelectStyled = styled.div`
    font-size: 1em;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
`;

const FlagStyled = styled.div`
    flex-shrink: initial;
    width: 45px;
    span {
        margin-top: 8px;
    }
`;

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

    async checkForVisas(event){

        const {destinations, countries} = this.props

        // fetching too early, countries probably not loaded yet
        if(Object.keys(countries || {}).length == 0){
            return;
        }
        const nationality = countries[event.value]

        this.props.isLoading(true)

        const destinationCountries = destinations.map(d => countries[d])

        const baseUrl = `/visas?citizenship=${nationality.countryCode.toUpperCase()}`
        let payload = {}
        for(let dest of destinationCountries){
            let resp = await API.get({url: baseUrl + `&destination=${dest.countryCode}`})
            let body = await resp.json()
            if(body.results && body.results[0]) {
                let key =  nationality.countryCode + '-' + dest.countryCode
                payload[key] = {
                    ...body.results[0],
                    destination: dest,
                    nationality
                }
            }
        }
        this.props.dispatch({ type: ADD_RESULTS, payload })
        this.props.isLoading(false)
    }

    componentDidMount() {
        const {countries, defaultNationality} = this.props
        if(!countries){
            const countryData = require('g-countries')
            this.props.dispatch({
                type: ADD_COUNTRIES,
                payload: {
                    countries: countryData
                }
            })
            if(defaultNationality){
                let nationality = countryData[defaultNationality.toUpperCase()]
                this.checkForVisas({value: nationality.countryCode})
                this.setState({nationality})
            }
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
            <ComboboxInputStyled>
                <SelectStyled>
                    {!!nationality && (
                        <FlagStyled>
                            <img src={`${FLAGS_ROOT_URL}/4x3/${nationality.flagSVG}`}/>
                        </FlagStyled>
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
                </SelectStyled>
            </ComboboxInputStyled>
        );
    }
}

export default connect(({visachecker}) => ({
    countries: visachecker.countries,
}))(ComboBoxInput)
