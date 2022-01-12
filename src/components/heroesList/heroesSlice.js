import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';      //  Не будет работать с мемоизированной функцией

const heroesAdapter = createEntityAdapter()

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',                   // Тип действия
    async () => {                           // Должна вернуть промис
        const {request} = useHttp()
        return await request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        addHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload)
        },
        removeHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {          
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingError = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = heroesSlice;

export default reducer

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.filterActive,
    selectAll,
    (filter, heroes) => {
        return filter === 'all' ? heroes : 
            heroes.filter(hero => hero.element === filter)
    }
)

export const {
    addHero,
    removeHero
} = actions