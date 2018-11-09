import React from "react";
import DOMServer from 'react-dom/server'

import {DestinationResult} from './DestinationResult'
import CautionSVG from './CautionSVG'
import CheckSVG from './CheckSVG'

const styles = {
    headerOuter: {
        background: '#def9dc',
        padding: '4px 0 4px 20px',
        border: '1px solid #a7cf9d',
        overflow: 'hidden',
    },
    requiredHeader: {
        background: '#fcdbdb',
        border: '1px solid #f3a6b6'
    },
    headerInner: {
        margin: '8px 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}

const cautionURI = `url("data:image/svg+xml,${encodeURIComponent(DOMServer.renderToStaticMarkup(<CautionSVG />))})`
const checkURI = `url("data:image/svg+xml,${encodeURIComponent(DOMServer.renderToStaticMarkup(<CheckSVG />))})`

export const VisaResults = ({results, required}) =>
    <div style={{marginTop: 20}}>
        <div style={{...styles.headerOuter, ...(required ? styles.requiredHeader : {})}}>
            <div style={styles.headerInner}>
                <span style={{flexShrink: 1, marginRight: 15}}>
                    {required ?
                        <CautionSVG height={30} width={30} /> :
                        <CheckSVG height={20} width={20} />
                    }
                </span>
                <span style={{flexGrow: 1, fontSize: 20, fontWeight: 800}}>
                    {`You ${!required ? "don't" : ""} need a visa for`}
                </span>
            </div>
        </div>
        {Object.values(results || {}).map((data, key) =>
            <DestinationResult data={data} key={key} />
        )}
    </div>
