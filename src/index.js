import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {VisaChecker} from './components/VisaChecker'
import {visaCheckReducer} from './reducers'

const reducers = combineReducers({
    visachecker: visaCheckReducer
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const VisaCheckerDOM = document.getElementById('visa-checker')
if(VisaCheckerDOM){
    const countryCodes = VisaCheckerDOM.getAttribute('data-destinations')
    const nationality = VisaCheckerDOM.getAttribute('data-nationality')
    if(countryCodes && countryCodes.length){
        ReactDOM.render(
            <Provider store={store}>
                <VisaChecker destinations={countryCodes} nationality={nationality} verbosity={1}/>
            </Provider>,
            VisaCheckerDOM
        )
    }
}

export {VisaChecker} from './components/VisaChecker'
export {visaCheckReducer} from './reducers'
