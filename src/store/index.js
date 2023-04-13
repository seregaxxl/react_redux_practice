import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/heroesFiltersSlice'
import { apiSlice } from '../api/apiSlice';

const stringMiddleWare = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

const store = configureStore({
    reducer: {heroes, filters, [apiSlice.reducerPath]:apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'

})


export default store;