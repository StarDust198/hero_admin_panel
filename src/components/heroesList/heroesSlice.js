import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';      //  Не будет работать с мемоизированной функцией

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

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
    reducers: {                                 //  также конвертируется в иммутабельный код
        addHero: (state, action) => {
            state.heroes.push(action.payload)
        },
        removeHero: (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {          
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                state.heroes = action.payload
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingError = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = heroesSlice;

export default reducer
export const {
    addHero,
    removeHero
} = actions