import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useGetHeroesQuery, useRemoveHeroMutation } from '../../api/apiSlice'
import { getActiveFilter } from '../heroesFilters/filtersSlice'

import HeroesListItem from "../heroesListItem/HeroesListItem"
import Spinner from '../spinner/Spinner'

const HeroesList = () => {   
    const activeFilter = useSelector(getActiveFilter)

    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery() 
    
    const [ removeHero ] = useRemoveHeroMutation()

    const filteredHeroes = useMemo(() => {
        return heroes.filter(hero => activeFilter === 'all' || hero.element === activeFilter)
    }, [heroes, activeFilter])

    // Передающуюся вниз функцию надо оборачивать в useCallback
    const deleteHero = useCallback((id) => {
        removeHero(id).unwrap().catch(console.log)
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки..</h5>
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