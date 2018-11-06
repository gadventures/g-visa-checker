import React from "react";
import DOMServer from 'react-dom/server'
import styled from "styled-components";

import {DestinationResult} from './DestinationResult'
import CautionSVG from './CautionSVG'
import CheckSVG from './CheckSVG'
// import CautionSVG from "../static/icon-caution.svg";
//import CheckSVG from "../static/icon-check.svg";

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
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const VisaDisplayStyled = styled.div`
    margin-top: 20px;
`;

const cautionURI = `url("data:image/svg+xml,${encodeURIComponent(DOMServer.renderToStaticMarkup(<CautionSVG />))})`
const checkURI = `url("data:image/svg+xml,${encodeURIComponent(DOMServer.renderToStaticMarkup(<CheckSVG />))})`

export const VisaResults = ({results, required}) =>
    <VisaDisplayStyled>
        <HeaderStyled required={required}>
            <HeaderInnerStyled>
                <span style={{flexShrink: 1, marginRight: 15}}>
                    {required ?
                        <CautionSVG height={30} width={30} /> :
                        <CheckSVG height={20} width={20} />
                    }
                </span>
                <span style={{flexGrow: 1}}>
                    {`You ${!required ? "don't" : ""} need a visa for`}
                </span>
            </HeaderInnerStyled>
        </HeaderStyled>
        {Object.values(results || {}).map((data, key) =>
            <DestinationResult data={data} key={key} />
        )}
    </VisaDisplayStyled>
