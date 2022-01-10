import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { addHero } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const createHero = async(values) => {
        values.id = uuidv4()
        await request(`http://localhost:3001/heroes/`, 'POST', JSON.stringify(values))
            .then(dispatch(addHero(values)))
            .catch(console.log)
    }

    const renderOptions = (arr, status) => {
        if (status === 'loading') {
            return <option value="">Идёт загрузка...</option>
        } else if (status === 'error') {
            return <option>Ошибка загрузки..</option>
        }

        return arr
            .map(({id, element, label}) => {
                if (element === 'all') {
                    return <option key={id} value="">Я владею элементом...</option>
                } else {
                    return <option value={element} key={id}>{label}</option>
                }                
            })
    }
    
    const options = (renderOptions(filters, filtersLoadingStatus))

    return (
        <Formik
            initialValues={{ name: '', description: '', element: '' }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Необходимо указать имя';
                } else if (values.name.length < 3) {
                    errors.name = 'Не менее 3-х символов';
                }
                if (!values.description) {
                    errors.description = 'Необходимо указать описание';
                } else if (values.description.length < 10) {
                    errors.description = 'Не менее 10-ти символов';
                }
                if (!values.element) {
                    errors.element = 'Необходимо выбрать стихию';
                }  
                return errors;
            }}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                values.id = uuidv4()
                createHero(values)
                    .then(() => {
                        resetForm()
                        setSubmitting(false)
                    })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name" 
                            placeholder="Как меня зовут?"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}/>
                        {errors.name && touched.name && errors.name}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <textarea
                            name="description" 
                            className="form-control" 
                            id="description" 
                            placeholder="Что я умею?"
                            style={{"height": '130px'}}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}/>
                        {errors.description && touched.description && errors.description}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <select 
                            className="form-select" 
                            id="element" 
                            name="element"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.element}>
                                {options}
                        </select>
                        {errors.element && touched.element && errors.element}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Создать</button>
                </form>
            )}
        </Formik>
    )
}

export default HeroesAddForm;