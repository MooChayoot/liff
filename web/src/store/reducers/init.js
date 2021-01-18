import * as ACTION_TYPES from '../actions/action_type'

const initialState = {
    initState: 'initialState...'
}

const ReduxInitReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.INITREDUX:

            return {
                ...state,
                initState: 'initialState...done'
            }
        default:
            return state
    }
}

export default ReduxInitReducer