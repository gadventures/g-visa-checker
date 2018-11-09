import React from 'react'
import {connect} from 'react-redux'

const styles = {
    destOuter: {
        fontFamily: 'Montserrat, Sans-serif',
        fontWeight: 400,
        fontSize: 16,
        borderTop: 0,
        padding: 10,
        clear: 'both',
    },
    destName: {
        fontWeight: 600,
        padding: '10px 0 5px',
        marginBottom: 0,
        marginTop: 0,
        fontSize: 20,
    },
    destNotes: {
        fontWeight: 300,
        padding: 0,
        margin: 0,
        margin: 0,
        fontSize: 14,
        lineHeight: '22px',
        color: '#4c4f56',
    },
    destLinkOuter: {
        display: 'inline-block',
        textAlign: 'center',
        borderRadius: 5,
        background: '#fc0d1b',
        marginTop: 20,
    },
    destLink: {
        width: 150,
        fontSize: 14,
        color: '#fff',
        textDecoration: 'none',
        padding: 10,
        fontWeight: 'bold',
    }
}

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
        <div style={{...styles.destOuter, border: (required ? "1px solid #f3a6b6" : "1px solid #a7cf9d")}}>
            <p style={styles.destName}>
                {data.destination.country}
            </p>
            <p style={styles.destNotes}>{notes}</p>
            {!!url && (
                <div style={styles.destLinkOuter}>
                    <a target="_blank" style={styles.destLink} href={url}>
                        {"Apply CTA"}
                    </a>
                </div>
            )}
        </div>
    )
}
