import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { createSelector } from '@reduxjs/toolkit';
import { useGetHeroesQuery } from '../../api/apiSlice';

import { fetchHeroes, selectAll } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery();

    const activeFilter = useSelector(state => state.filters.activeFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();
        if (activeFilter === 'all') {
            return filteredHeroes
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter])


    // const filteredHeroSelector = createSelector(
    //     (state) => state.filters.activeFilter,
    //     selectAll,
    //     (filters, heroes) => {
    //         if (filters === 'all') {
    //             return heroes
    //         } else {
    //             return heroes.filter(item => item.element === filters)
    //         }
    // })
    // const filteredHeroes = useSelector(filteredHeroSelector);

    const [show, setShow] = useState(false);
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(fetchHeroes());
        setShow(true);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    }, [filteredHeroes]);

    // if (heroesLoadingStatus === "loading") {
    if (isLoading) {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({id, ...props}, i) => {
            // const showArr = [...show]
            // showArr[i] = true;
            // setTimeout(() => {
            //     setShow(showArr);
            //     }, 1000 * i);
            return (<CSSTransition
                    key={id}
                    classNames="hero"
                    timeout={500}
                    appear={true}
                    in={show}
                    >
                        <HeroesListItem {...props} id={id}/>
                    </CSSTransition> )
        })
    }

    // const elements = renderHeroesList(filteredHeroes);
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;