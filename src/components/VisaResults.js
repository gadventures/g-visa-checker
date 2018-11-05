import React from "react";
import styled from "styled-components";

import {DestinationResult} from './DestinationResult'
import CautionSVG from "../static/icon-caution.svg";
import CheckSVG from "../static/icon-check.svg";

const HeaderStyled = styled.div`
    background: #def9dc;
    padding: 4px 0 4px 20px;
    border: 1px solid #a7cf9d;
    overflow: hidden;

    background: ${props => (props.required ? "#fcdbdb" : "")};
    border: ${props => (props.required ? "1px solid #f3a6b6" : "")};
    font-size: 20px;
    font-weight: 800;
`;

const HeaderInnerStyled = styled.h3`
    margin: 14px 0;
    img {
        padding-bottom: 4px;
        padding-right: 15px;
    }
`;

const VisaDisplayStyled = styled.div`
    margin-top: 20px;
`;


export const VisaResults = ({results, required}) =>
    <VisaDisplayStyled>
        <HeaderStyled required={required}>
            <HeaderInnerStyled>
                {required ?
                    <img src={CautionSVG} width={20}/> :
                    <img src={CheckSVG} width={20}/>
                }
                {`You ${!required ? "don't" : ""} need a Visa for`}
            </HeaderInnerStyled>
        </HeaderStyled>
        {Object.values(results || {}).map((data, key) =>
            <DestinationResult data={data} key={key} />
        )}
    </VisaDisplayStyled>
