import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, fetchHeroes } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroSelector = createSelector(
        (state) => state.filters.filters,
        (state) => state.heroes.heroes,
        (filters, heroes) => {
            if (filters === 'all') {
                return heroes
            } else {
                return heroes.filter(item => item.element === filters)
            }
    })
    const filteredHeroes = useSelector(filteredHeroSelector);

    const [show, setShow] = useState([]);
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();



    useEffect(() => {
        dispatch(fetchHeroes(request));
    }, []);

    useEffect(() => {
        setShow(filteredHeroes.map(() => false));
        let timeoutIds = [];
        filteredHeroes.forEach((_, i) => {
            const timeoutId = setTimeout(() => {
                setShow(show => {
                    const updatedShow = [...show];
                    updatedShow[i] = true;
                    return updatedShow;
                });
            }, 500 * i);
            timeoutIds.push(timeoutId);
        });
        return () => {
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [filteredHeroes]);

    if (heroesLoadingStatus === "loading") {
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
                    classNames="card"
                    timeout={200}
                    in={show[i]}
                    >
                        <HeroesListItem key={id} {...props} id={id}/>
                    </CSSTransition> )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;