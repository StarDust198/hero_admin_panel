import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    addHero,
    removeHero
} from '../actions'                              // для createReducer нужно итпортировать actions

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// Первая версия, будет работать и в TypeScript
// const heroes = createReducer(initialState, builder => {     // builder подставляется автоматически
//     builder
//         .addCase(heroesFetching, state => {     // код превращается в иммутабельный автоматически
//             state.heroesLoadingStatus = 'loading'   // но если возвращать из функции результат
//         })                                          // то автоматической иммутабельности не будет
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle'
//             state.heroes = action.payload
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingError = 'error'
//         })
//         .addCase(addHero, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addCase(removeHero, (state, action) => {
//             state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
//         })
//         .addDefaultCase(() => {})
// })

// Не будет работать в TypeScript
const heroes = createReducer(initialState, {
    [heroesFetching]: state => {
        state.heroesLoadingError = 'loading'
    },
    [heroesFetched]: (state, action) => {
        state.heroesLoadingStatus = 'idle'
        state.heroes = action.payload
    },
    [heroesFetchingError]: state => {
        state.heroesLoadingError = 'error'
    },
    [addHero]: (state, action) => {
        state.heroes.push(action.payload)
    },
    [removeHero]: (state, action) => {
        state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
    }    
}, [], state => state)

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'REMOVE_HERO':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(hero => hero.id !== action.payload)
//             }
//         case 'ADD_HERO':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         default: return state
//     }
// }

export default heroes;