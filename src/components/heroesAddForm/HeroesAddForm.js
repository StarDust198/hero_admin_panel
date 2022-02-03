import { useMemo } from 'react';

import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { useAddHeroMutation, useGetFiltersQuery } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const {
        data: filters = [],
        isLoading,
        isError
    } = useGetFiltersQuery() 

    const [ addHero ] = useAddHeroMutation()

    const createHero = async(values) => {
        values.id = uuidv4()
        try {
            await addHero(values).unwrap()
        } catch (err) {
            console.error('Failed to save the hero, error: ', err)
        }
    }

    const renderOptions = useMemo(() => {
        if (isLoading) {
            return <option value="">Идёт загрузка...</option>
        } else if (isError) {
            return <option>Ошибка загрузки..</option>
        }

        return filters.map(({id, element, label}) => {
            if (element === 'all') {
                return <option key={id} value="">Я владею элементом...</option>
            } else {
                return <option value={element} key={id}>{label}</option>
            }                
        })
    }, [filters, isLoading, isError])
    
    const options = (renderOptions)

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