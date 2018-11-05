import React from "react";
import {connect} from 'react-redux'
import Select from "react-select";
import styled from "styled-components";
import FlagIcon from './FlagIcon'

import {API} from '../gapi'
import {ADD_NATIONALITIES, ADD_RESULTS} from '../constants'

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

    async loadNationalities(){
        const responses = await Promise.all(
            // there are currently 239 nationalities in our api
            [1, 2, 3].map(page =>
                API.get({url: `/nationalities?page=${page}&max_per_page=100`})
            )
        )
        let nationalities = []
        for(let resp of responses){
            let body = await resp.json()
            if(!(body.results && body.results.length)){
                continue
            }
            for(let nat of body.results){
                if(nat.country){
                    nationalities.push({
                        countryCode: nat.country.id.toUpperCase(),
                        name: nat.name,
                        country: nat.country.name
                    })
                }
            }
        }
        this.props.dispatch({
            type: ADD_NATIONALITIES,
            payload: {
                nationalities: nationalities.reduce((all, n) => ({...all, [n.countryCode]: n}), {})
            }
        })
    }

    async checkForVisas(event){

        const {destinations, nationalities} = this.props
        const nationality = nationalities[event.value]

        this.props.isLoading(true)

        const destinationCountries = destinations.map(d => nationalities[d])

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
        const {nationalities} = this.props
        if(!nationalities){
            this.loadNationalities()
        }
    }

    render() {
        const {nationality} = this.state
        const nationalities = Object.values(this.props.nationalities || {})

        // make them alphabetical
        nationalities.sort((a, b) => (a.name > b.name ? 1 : -1))

        return (
            <ComboboxInputStyled>
                <SelectStyled>
                    {!!nationality && (
                        <FlagStyled>
                            <FlagIcon
                                code={nationality.countryCode.toLowerCase()}
		                        size={'lg'}
                            />
                        </FlagStyled>
                    )}
                    {!!(nationalities && nationalities.length) &&
                        <div style={{flexGrow: 1}}>
                            <Select
                                styles={SelectStyles}
                                placeholder="Your Citizenship"
                                options={nationalities.map(n => ({
                                    label: n.name,
                                    value: n.countryCode,
                                }))}
                                onChange={(e) => {
                                    this.setState({nationality: this.props.nationalities[e.value]})
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
    nationalities: visachecker.nationalities,
}))(ComboBoxInput)
