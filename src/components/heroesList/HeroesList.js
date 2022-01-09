import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, removeHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, filterActive} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    const deleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(removeHero(id)))
    }

    // const renderHeroesList = (arr) => {
    //     if (arr.length === 0) {
    //         return <h5 className="text-center mt-5">Героев пока нет</h5>
    //     }        

    //     return arr
    //         .filter(hero => hero.element === filterActive || filterActive === 'all')
    //         .map(({id, ...props}) => {
    //             return (
    //                <HeroesListItem key={id} removeHero={() => deleteHero(id)} {...props}/>
    //             )
    //         })
    // }

    // const elements = renderHeroesList(heroes);

    return (
        <TransitionGroup component="ul">
            {heroes
                .filter(hero => hero.element === filterActive || filterActive === 'all')
                .map(({id, ...props}) => {
                    return (
                        <CSSTransition key={id} timeout={1000} classNames="hero-item" mountOnEnter>
                            <HeroesListItem removeHero={() => deleteHero(id)} {...props}/>
                        </CSSTransition>
                    )
            })}
        </TransitionGroup>
    )
}

export default HeroesList;