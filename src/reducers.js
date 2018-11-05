import {
    ADD_NATIONALITIES,
    ADD_RESULTS,
} from './constants'

export const visaCheckReducer = (
    state = { nationalities: null, },
    {type, payload}
) => {
    switch(type){
        case ADD_NATIONALITIES:
            return {
                ...state,
                nationalities: payload.nationalities
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
