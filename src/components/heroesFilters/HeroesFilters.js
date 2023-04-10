import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { heroFilter } from "./heroesFiltersSlice";
import { fetchFilters } from "./heroesFiltersSlice";


const HeroesFilters = () => {
    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const[filter, setFilter] = useState([]);
    useEffect(() => {
        dispatch(fetchFilters());
        }, []);
    useEffect(() => {
        const values = Object.keys(filters);
        const buttons = Object.values(filters);
        console.log(values)
        console.log(buttons)
        setFilter(values.map((item, i) => 
            <button
            onClick={() => {dispatch(heroFilter(item))}}  className={'btn ' + buttons[i].btn}>
            {buttons[i].name}
            </button>))
        console.log(filter)
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