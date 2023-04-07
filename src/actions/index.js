export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleting = (id, heroes) => {
    return {
        type: 'HERO_DELETING',
        payload: heroes.filter(item => item.id !== id)
    }
}

export const heroAdd = (heroes, hero) => {
    return {
        type: 'HERO_ADD',
        payload: [...heroes, hero]
    }
}

export const heroFilter = (filter) => {
    return {
        type: 'HERO_FILTER',
        payload: filter ? filter : 'all'
    }
}


