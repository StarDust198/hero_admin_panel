import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, removeHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.filterActive,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            return filter === 'all' ? heroes : 
                heroes.filter(hero => hero.element === filter)
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector)

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch('HEROES_FETCHING');
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);    

    // Передающуюся вниз функцию надо оборачивать в useCallback
    const deleteHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(removeHero(id)))
            .catch(console.log)
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition timeout={1000} classNames="hero-item" mountOnEnter>
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )            
        }        

        return arr
            .map(({id, ...props}) => {
                return (
                    <CSSTransition key={id} timeout={1000} classNames="hero-item">
                        <HeroesListItem removeHero={() => deleteHero(id)} {...props}/>
                    </CSSTransition>
                )
            })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;