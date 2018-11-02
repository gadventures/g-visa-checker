import React from 'react'
import {connect} from 'react-redux'
import styled from "styled-components";

const DestinationStyled = styled.div`
    font-family: Montserrat, Sans-serif;
    font-weight: 400;
    font-size: 1em;
    border-top: 0;
    padding: 10px;
    clear: both;

    border: ${({required}) =>
        !!required ?  "1px solid #f3a6b6" : "1px solid #a7cf9d"
    };
`;

const DestinationNameStyled = styled.p`
    font-weight: 600;
    padding: 10px 0 5px;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1.2em;
`;

const DestinationNotesStyled = styled.p`
    font-weight: 300;
    padding: 0;
    margin: 0;
    margin: 0;
    font-size: 1em;
    line-height: 1.3em;
    color: #4c4f56;
`;

const DestinationCallToAction = styled.div`
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    background: #fc0d1b;
    margin-top: 20px;
    a {
        width: 150px;
        font-size: 0.9em;
        color: white;
        text-decoration: none;
        padding: 10px;
        font-weight: bold;
    }
`;

export const DestinationResult = ({data}) => {
    let {notes = '', urls_to_apply, required} = data
    let url
    if(typeof notes === 'string'){
        notes = notes.replace("['", "").replace("']", "")
    }
    if(urls_to_apply.length && required){
        url = urls_to_apply[0]
    }
    return (
        <DestinationStyled required={required}>
            <DestinationNameStyled required={required}>
                {data.destination.country}
            </DestinationNameStyled>
            <DestinationNotesStyled>{notes}</DestinationNotesStyled>
            {!!url && (
                <div>
                    <DestinationCallToAction>
                        <a target="_blank" href={url}>
                            {"Apply CTA"}
                        </a>
                    </DestinationCallToAction>
                </div>
            )}
        </DestinationStyled>
    )
}
