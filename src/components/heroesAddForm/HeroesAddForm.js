import { useSelector, useDispatch } from 'react-redux';
import { heroAdd } from '../../actions';
import { Formik, Field, Form } from 'formik';
import { useState, useEffect } from 'react';

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
    const {heroes} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getFilters = async () => {
            try {
                const response = await fetch(`http://localhost:3001/filters/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: null
                });
                if (!response.ok) {
                    throw new Error(`Could not fetch http://localhost:3001/filters/, status: ${response.status}`);
                }

                const data = await response.json();
                return data
            } catch (error) {
                alert(error)
            }
        }
        
        getFilters().then(res => {
            const texts = Object.values(res)
            
            setOptions(Object.keys(res).map((item, i) => i === 0 ? null : <option value={item}>{texts[i]}</option>))
        });
    }, []);

    const addItem = async (heroes, hero) => {
        try {
          const response = await fetch(`http://localhost:3001/heroes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(hero)
          });
          if (response.ok) {
            dispatch(heroAdd(heroes, hero))
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
            hero.id = heroes[heroes.length - 1].id + 1
            addItem(heroes, hero)
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
                        {/* <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option> */}
                    </Field>
                </div>

                <button type="submit"  className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;