import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeActiveFilter, fetchFilters } from './filtersSlice';
import Spinner from '../spinner/Spinner';

var classNames = require('classnames');

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, filterActive} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({id, clazz, label, element}) => {
            const btnClass= classNames('btn', `${clazz}`, {
                'active': element === filterActive
            })

            return <button 
                className={btnClass} 
                key={id} 
                element={element}
                onClick={() => dispatch(changeActiveFilter(element))}>
                    {label}
            </button>
        })
    }

    const elements = renderFiltersList(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;