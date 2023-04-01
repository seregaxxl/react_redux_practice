import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleting } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const [show, setShow] = useState([]);
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setShow(heroes.map(() => false));
        let timeoutIds = [];
        heroes.forEach((_, i) => {
            const timeoutId = setTimeout(() => {
                setShow(show => {
                    const updatedShow = [...show];
                    updatedShow[i] = true;
                    return updatedShow;
                });
            }, 1000 * i);
            timeoutIds.push(timeoutId);
        });
        return () => {
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [heroes]);

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

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;