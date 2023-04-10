import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { heroFilter, selectAll ,fetchFilters } from "./heroesFiltersSlice";
import store from '../../store';


const HeroesFilters = () => {
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    const[filter, setFilter] = useState([]);
    useEffect(() => {
        dispatch(fetchFilters());
        }, []);
    useEffect(() => {
        setFilter(filters.map((item, i) => 
            <button
            onClick={() => {dispatch(heroFilter(item.id))}}  className={'btn ' + item.btn}>
            {item.name}
            </button>))
    }, [filters])

    return (
        <div className="cardd shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">

                    {filter}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;