import { createApi, fetchBaseQuery } from  '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Hero'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => 'heroes',
            providesTags: (result = [], error, arg) => [
                'Hero',
                ...result.map(({ id }) => ({ type: 'Hero', id }))
            ]
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
        })
        // For future builders
        // invalidatesTags: (result, error, arg) => [{ type: 'Hero', id: arg }]
    })
})

export const {
    useGetHeroesQuery,
    useAddHeroMutation,
    useRemoveHeroMutation
} = apiSlice