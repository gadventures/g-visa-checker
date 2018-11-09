import React from "react";

const Header = ({passenger}) =>
    <h2 style={headerStyle}>
        {passenger ? `${passenger}, do` : "Do"} you need a visa?
    </h2>

export default Header;
