import { useDispatch } from 'react-redux';
import { heroAdd } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/heroesFiltersSlice';
import { Formik, Field, Form } from 'formik';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

const HeroesAddForm = () => {
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    useEffect(() => {
            setOptions(filters.map((item, i) => i === 0 ? null : <option value={item.id}>{item.name}</option>))

    }, [filters]);

    const addItem = async (hero) => {
        try {
          const response = await fetch(`http://localhost:3001/heroes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(hero)
          });
          if (response.ok) {
            dispatch(heroAdd(hero))
          } else {
            alert('cannot be added')
          }
        } catch (error) {
            alert(error)
        }
      };
    return (
        <Formik
        initialValues={{
            name: '',
            text: '',
            element: '',
          }}
          onSubmit={async (values) => {
            const hero = values
            hero.id = uuidv4();
            addItem(hero)
          }}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field  
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field as='textarea'
                        required
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field as='select' 
                        required
                        className="form-select" 
                        id="element" 
                        name="element">
                        <option >Я владею элементом...</option>
                        {options}
                    </Field>
                </div>

                <button type="submit"  className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;