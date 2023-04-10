import { configureStore } from '@reduxjs/toolkit';
// import heroes from '../reducers/heroes'
import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters'

const stringMiddleWare = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production'

})


export default store;