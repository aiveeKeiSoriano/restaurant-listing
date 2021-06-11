import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { searchRestau, selectGenre } from "../redux/actions.js/actions"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

const Search = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    border: 1px solid #424242;

    input {
        flex: 1;
        border: none;
        padding: .8em 1em;

        &:focus {
            outline: none;
        }
    }

    button {
        padding: .5em 1em;
        border: none;
        text-transform: uppercase;
        background-color: #c6bbf1;
        font-family: "Lato", sans-serif;
        font-weight: 700;
    }

`
const Filter = styled.div`
    border: 1px solid #424242;
    display: flex;
    gap: 1em;
    align-items: center;
    width: 250px;
    padding-left: 1em;
    background-color: #c6bbf1;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: .85rem;

    select {
        flex: 1;
        border: none;
        padding: .8em 1em;

        &:focus {
            outline: none;
        }
    }
`

export default function FilterField() {

    let genreList = useSelector(state => state.genreList)
    let dispatch = useDispatch()

    let searchRef = useRef()

    return (
        <Container>
            <Search>
                <input type="text" ref={searchRef} onKeyPress={(e) => e.code === "Enter" ? dispatch(searchRestau(e.target.value)) : null} onChange={(e) => e.target.value === "" ? dispatch(searchRestau("")) : null} />
                <button onClick={() => dispatch(searchRestau(searchRef.current.value))}>Search</button>
            </Search>
            <Filter>
                <p>Filter</p>
                <select onChange={(e) => dispatch(selectGenre(e.target.value))}>
                    {genreList.map(genre => <option>{genre}</option>)}
                </select>
            </Filter>
        </Container>
    )
}