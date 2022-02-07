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
            async onQueryStarted(newHero, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    apiSlice.util.updateQueryData('getHeroes', undefined, draft => {
                        draft.push(newHero)
                    })
                )
                try{
                    await queryFulfilled
                } catch {
                    addResult.undo()
                }
            },
            invalidatesTags: ['Hero']
        }),
        removeHero: builder.mutation({
            query: heroId => ({
                url: `heroes/${heroId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(heroId, { dispatch, queryFulfilled }) {
                const removeResult = dispatch(
                    apiSlice.util.updateQueryData('getHeroes', undefined, draft => {
                        return draft.filter(hero => hero.id !== heroId )
                    })
                )
                try{
                    await queryFulfilled
                } catch {
                    removeResult.undo()
                }
            },
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