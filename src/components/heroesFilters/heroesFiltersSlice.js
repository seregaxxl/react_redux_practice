import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

// const initialState = {
//     filters: {},
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}) 

export const fetchFilters = createAsyncThunk(
    'filters/Filters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        heroFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
    },    
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending,state => {
                state.filtersLoadingStatus = 'loading'})
            .addCase(
                
                // fetchFilters.fulfilled,(state, action) => {
                // state.filtersLoadingStatus = 'idle'
                // state.filters = action.payload}
                
                fetchFilters.fulfilled,(state, action) => {
                    state.filtersLoadingStatus = 'idle';
                    filtersAdapter.setAll(state, action.payload)})
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error'})
            .addDefaultCase(()=>{})
    }
});

const {actions, reducer} = filterSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export const {heroFilter, filtersFetched, filterssFetchingError, filtersFetching} = actions;