import React from "react";
import {connect} from 'react-redux'

import Header from "./Header";
import UserCountryInput from "./UserCountryInput";
import {VisaResults} from './VisaResults'
import {Loading} from './Loading'


@connect(({visachecker}) => ({
    results: visachecker.results,
}))
class VisaChecker extends React.Component{

    state = {loading: false}

    isLoading = (loading) => {
        this.setState({loading})
    }

    render(){
        const {results, destinations, passenger} = this.props;
        const destList = destinations.toUpperCase().split(/[,\s]+/)
        const visaRequired = Object.values(results || {}).filter(r => r.required)
        const visaNotRequired = Object.values(results || {}).filter(r => !r.required)
        return (
            <div>
                <Header passenger={passenger}/>
                <UserCountryInput destinations={destList} isLoading={this.isLoading.bind(this)}/>
                {this.state.loading && <Loading />}
                {(!this.state.loading && !!visaRequired.length) &&
                    <VisaResults results={visaRequired} required={true} key={1} />
                }
                {(!this.state.loading && !!visaNotRequired.length) &&
                    <VisaResults results={visaNotRequired} required={false} key={2} />
                }

            </div>
        );
    }
}

export {VisaChecker}
