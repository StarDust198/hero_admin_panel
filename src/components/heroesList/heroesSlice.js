import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {                                 //  также конвертируется в иммутабельный код
        heroesFetching: state => {          
            state.heroesLoadingStatus = 'loading'
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload
        },
        heroesFetchingError: state => {
            state.heroesLoadingError = 'error'
        },
        addHero: (state, action) => {
            state.heroes.push(action.payload)
        },
        removeHero: (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
        }    
    }
})

const {actions, reducer} = heroesSlice;

export default reducer
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    addHero,
    removeHero
} = actions