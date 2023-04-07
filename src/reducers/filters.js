const initialState = {
    filters: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
       
        case 'HERO_FILTER':

            return {
                ...state,
                filters: action.payload
            }
        default: return state
    }
}

export default filters;