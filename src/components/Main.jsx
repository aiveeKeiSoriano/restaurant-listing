import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changePage, getRestaurants } from "../redux/actions.js/actions"
import FilterField from "./FilterField"

const Container = styled.div`
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    max-width: 1200px;
    padding: 2em;
    min-Height: 650px;
`

const Table = styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

    thead th {
        padding: 1em;
        background-color: #171940;
        color: white;
    }

    & td, th {
    border: 1px solid #424242;
    text-align: left;
    padding: 12px 16px;
    }

    tr:nth-child(even) {
    background-color: #c6bbf1;
    }
`

const PageNav = styled.div`
    margin-top: auto;
    align-self: flex-end;
    display: flex;
    gap: .5em;

    button {
        padding: .5em 1em;
    }
`

export default function Main() {

    let state = useSelector(state => state)
    let dispatch = useDispatch()

    let { restaurants, page, selectedGenre, searchTerm } = state

    useEffect(() => dispatch(getRestaurants())
        // eslint-disable-next-line
        , [])

    let filteredRestaurants = selectedGenre === "All" ? restaurants : restaurants.filter(el => el.genre.split(",").includes(selectedGenre))
    let regex = new RegExp(searchTerm, "i")
    let searchedRestaurants = filteredRestaurants.filter(el => el.name.match(regex) || el.city.match(regex) || el.genre.match(regex))

    return (
        <Container>
            <FilterField />
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Phone Number</th>
                        <th>Genres</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedRestaurants.slice(page * 10, (page * 10) + 10).map((restau) =>
                        <tr>
                            <td>{restau.name}</td>
                            <td>{restau.city}</td>
                            <td>{restau.state}</td>
                            <td>{restau.telephone}</td>
                            <td>{restau.genre.split(',').join(', ')}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <PageNav>
                <button onClick={() => dispatch(changePage(Math.max(0, page - 1)))}>Prev</button>
                <button onClick={() => dispatch(changePage(Math.min(Math.ceil(searchedRestaurants.length / 10) - 1, page + 1)))}>Next</button>
            </PageNav>
        </Container>
    )
}