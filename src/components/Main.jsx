import { useEffect, useState } from "react"


export default function Main() {
    const API = "http://128.199.195.196:3001/"

    let [restaurants, setRestaurants] = useState([])
    let [page, setPage] = useState(0)

    let getRestaurants = async () => {
        let response = await fetch(API, { headers: { "Authorization": "Bearer iqi509189dxznal;,ggi" } })
        let data = await response.json()
        setRestaurants(data.sort((a, b) => a.name < b.name ? -1 : 1))
    }

    useEffect(() => getRestaurants()
        , [])

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Phone Number</th>
                        <th>Genres</th>
                    </tr>
                </thead>
                {restaurants.slice(page * 10, (page * 10) + 10).map((restau) =>
                    <tr>
                        <td>{restau.name}</td>
                        <td>{restau.city}</td>
                        <td>{restau.state}</td>
                        <td>{restau.telephone}</td>
                        <td>{restau.genre.split(',').join(', ')}</td>
                    </tr>
                )}
            </table>
            <div className="page">
                <button onClick={() => setPage(p => Math.max(0, p - 1))}>Prev</button>
                <button onClick={() => setPage(p => Math.min(Math.floor(restaurants.length / 10), p + 1))}>Next</button>
            </div>
        </div>
    )
}