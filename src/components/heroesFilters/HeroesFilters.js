import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { heroFilter } from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const[filter, setFilter] = useState([]);

    useEffect(() => {
        const getFilter = async () => {
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

        const getButtons = async () => {
            try {
                const response = await fetch(`http://localhost:3001/buttons/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: null
                });
                if (!response.ok) {
                    throw new Error(`Could not fetch http://localhost:3001/buttons/, status: ${response.status}`);
                }

                const data = await response.json();
                return data
            } catch (error) {
                alert(error)
            }
            
        }
        
        getButtons().then(res => {
            const texts = Object.values(res)
            const buttons = Object.keys(res)
            getFilter().then(res => {
                setFilter(Object.keys(res).map((item, i) => 
                <button
                onClick={() => {console.log(item); dispatch(heroFilter(item))}}  className={'btn ' + buttons[i]}>
                {texts[i]}
                </button>))
            })
        })
    }, []);

    

    return (
        <div className="cardd shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {filter}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;