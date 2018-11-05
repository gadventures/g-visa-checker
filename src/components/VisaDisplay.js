import React from "react";
import {connect} from 'react-redux'
import Loading from "./Loading";
import {VisaResults} from './VisaResults'


@connect(({visachecker})=>({
    results: visachecker.results
}))
class VisaDisplay extends React.Component {


    render() {
        const {results} = this.props
        if(!(results)){
            return <Loading show={true} />
        }

        const visaRequired = Object.values(results).filter(r => r.required)
        const visaNotRequired = Object.values(results).filter(r => !r.required)
        return (
            <div>
            </div>
        )
    }
}

export {VisaDisplay}
