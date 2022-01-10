export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const removeHero = (id) => {
    return {
        type: 'REMOVE_HERO',
        payload: id
    }
}

export const addHero = (hero) => {
    return {
        type: 'ADD_HERO',
        payload: hero
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const changeActiveFilter = (element) => {
    return {
        type: 'FILTER_CHANGE_ACTIVE',
        payload: element
    }    
}

// export const changeActiveFilter = (element) => (dispatch) => {  // dispatch подставляется автоматически
//     setTimeout(() => {
//         dispatch({
//             type: 'FILTER_CHANGE_ACTIVE',
//             payload: element
//         })
//     }, 1000)
// }