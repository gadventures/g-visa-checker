import {
    ADD_COUNTRIES,
    ADD_RESULTS,
} from './constants'

export const visaCheckReducer = (
    state = { countries: null, },
    {type, payload}
) => {
    switch(type){
        case ADD_COUNTRIES:
            return {
                ...state,
                countries: payload.countries
            }
        case ADD_RESULTS:
            return {
                ...state,
                results: payload
            }
        default:
            return state
    }
}
