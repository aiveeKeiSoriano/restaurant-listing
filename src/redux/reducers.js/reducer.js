import { CHANGE_PAGE, GENRE_LIST_RETRIEVED, RESTAURANTS_RETRIEVED, SEARCH_TERM, SELECT_GENRE } from "../actions.js/action_types";

const initialState = {
    restaurants: [],
    page: 0,
    genreList: [],
    selectedGenre: "All",
    searchTerm: ''
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case GENRE_LIST_RETRIEVED:
            return { ...state, genreList: action.payload }
        case RESTAURANTS_RETRIEVED:
            return { ...state, restaurants: action.payload }
        case CHANGE_PAGE:
            return { ...state, page: action.payload }
        case SELECT_GENRE:
            return { ...state, selectedGenre: action.payload }
        case SEARCH_TERM:
            return { ...state, searchTerm: action.payload }
        default:
            return state
    }
}