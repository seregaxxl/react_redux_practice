import { createAction } from '@reduxjs/toolkit';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}



// export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

// export const heroDeleting = createAction('HERO_DELETING', function prepare(id) {
//     return {
//       payload: id
//     }
//   })

// export const heroAdd = createAction('HERO_ADD', function prepare(hero) {
//     return {
//      payload: hero
//     }
// })

export const heroFilter = createAction('HERO_FILTER', function prepare(filter) {
    return {
      payload: filter ? filter : 'all'
    }
  })


// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroDeleting = (id, heroes) => {
//     return {
//         type: 'HERO_DELETING',
//         payload: heroes.filter(item => item.id !== id)
//     }
// }

// export const heroAdd = (heroes, hero) => {
//     return {
//         type: 'HERO_ADD',
//         payload: [...heroes, hero]
//     }
// }

// export const heroFilter = (filter) => {
//         return {
//             type: 'HERO_FILTER',
//             payload: filter ? filter : 'all'
//         }
// }

// export const heroFilter = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'HERO_FILTER',
//             payload: filter ? filter : 'all'
//         })
//     }, 1000)
// }


