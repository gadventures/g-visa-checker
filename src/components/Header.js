import React from "react";

const headerStyle = {
    fontFamily: 'Montserrat, Sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c4f56',
}

const Header = ({passenger}) =>
    <h2 style={headerStyle}>
        {passenger ? `${passenger}, do` : "Do"} you need a visa?
    </h2>

export default Header;
