import {
    createSlice,
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from '../../api/apiSlice'

const filterSlice = createSlice({
    name: 'activeFilter',
    initialState: {
        activeFilter: 'all'
    },
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        }
    }
})

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFilters: builder.query({
            query: () => 'filters',
            transformResponse: responseData => {
                return filtersAdapter.setAll(initialState, responseData)
            }
        })
    })
})

export const { useGetFiltersQuery } = extendedApiSlice

export const selectFiltersResult = apiSlice.endpoints.getFilters.select()

const selectFiltersData = createSelector(
    selectFiltersResult,
    filtersResult => filtersResult.data
)

export const { selectAll: selectAllFilters } =
  filtersAdapter.getSelectors(state => selectFiltersData(state) ?? initialState)

const { actions, reducer } = filterSlice;

export default reducer

export const getActiveFilter = state => state.filter.activeFilter

export const {
    changeActiveFilter
} = actions