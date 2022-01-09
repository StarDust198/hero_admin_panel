import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { filtersFetching, filtersFetched, filtersFetchingError, changeActiveFilter } from '../../actions';
import Spinner from '../spinner/Spinner';

var classNames = require('classnames');

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, filterActive} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (arr) => {
        return arr.map(({id, clazz, label, element}) => {
            const btnClass= classNames({
                btn: true,
                [`btn-${clazz}`]: true,
                active: element === filterActive
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

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFiltersList(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;