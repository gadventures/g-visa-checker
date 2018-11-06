import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.h2`
    font-family: Montserrat, Sans-serif;
    font-size: 1.6em;
    font-weight: bold;
    color: #4c4f56;
`;

const Header = ({passenger}) =>
    <HeaderStyled>
        {passenger ? `${passenger}, do` : "Do"} you need a visa?
    </HeaderStyled>

export default Header;
