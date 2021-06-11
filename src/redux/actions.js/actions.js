import { CHANGE_PAGE, GENRE_LIST_RETRIEVED, RESTAURANTS_RETRIEVED, SEARCH_TERM, SELECT_GENRE } from "./action_types"

const API = "http://128.199.195.196:3001/"

export const genreListRetrieved = (array) => ({
    type: GENRE_LIST_RETRIEVED,
    payload: array
})

export const restaurantsRetrieved = (array) => ({
    type: RESTAURANTS_RETRIEVED,
    payload: array
})

export const changePage = (num) => ({
    type: CHANGE_PAGE,
    payload: num
})

export const selectGenre = (genre) => ({
    type: SELECT_GENRE,
    payload: genre
})

export const searchRestau = (term) => ({
    type: SEARCH_TERM,
    payload: term
})

export const getRestaurants = () => {
    return async (dispatch) => {
        let response = await fetch(API, { headers: { "Authorization": "Bearer iqi509189dxznal;,ggi" } })
        let data = await response.json()
        let genreSet = new Set()
        data.forEach(restau => restau.genre.split(",").forEach(genre => genreSet.add(genre)))
        dispatch(genreListRetrieved(["All", ...genreSet]))
        dispatch(restaurantsRetrieved(data.sort((a, b) => a.name < b.name ? -1 : 1)))
    }
}