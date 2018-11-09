import React from "react"

const loadingStyle = {
    textAlign: 'center',
    padding: '20px 0',
    fontFamily: 'Sans-serif',
    color: '#cccccc',
}

export const Loading = () => {
    return <div style={loadingStyle}>{"Loading..."}</div>
}
