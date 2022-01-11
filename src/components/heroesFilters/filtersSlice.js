import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    filterActive: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {          
            state.filtersLoadingStatus = 'loading'
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle'
            state.filters = action.payload
        },
        filtersFetchingError: state => {
            state.filtersLoadingError = 'error'
        },
        changeActiveFilter: (state, action) => {
            state.filterActive = action.payload
        }
    }
})

const {actions, reducer} = filtersSlice;

export default reducer
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    changeActiveFilter
} = actions