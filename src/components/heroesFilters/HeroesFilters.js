import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import { changeActiveFilter } from './filtersSlice';
import classNames from 'classnames';

import { selectAllFilters } from './filtersSlice'

const HeroesFilters = () => {
    const dispatch = useDispatch()

    const activeFilter = useSelector(state => state.filter.activeFilter)
    const filters = useSelector(selectAllFilters)

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-1">Фильтров пока нет..</h5>
        }

        return arr.map(({id, clazz, label, element}) => {
            const btnClass= classNames('btn', `${clazz}`, {
                'active': element === activeFilter
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