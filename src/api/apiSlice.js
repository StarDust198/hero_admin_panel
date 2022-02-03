import { createApi, fetchBaseQuery } from  '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Hero'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => 'heroes',
            providesTags: ['Hero']
        }), 
        addHero: builder.mutation({
            query: newHero => ({
                url: 'heroes',
                method: 'POST',
                body: newHero
            }),
            invalidatesTags: ['Hero']
        }),
        removeHero: builder.mutation({
            query: heroId => ({
                url: `heroes/${heroId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Hero']
        }),
        getFilters: builder.query({
            query: () => 'filters'
        })
    })
})

export const {
    useGetHeroesQuery,
    useAddHeroMutation,
    useRemoveHeroMutation,
    useGetFiltersQuery
} = apiSlice