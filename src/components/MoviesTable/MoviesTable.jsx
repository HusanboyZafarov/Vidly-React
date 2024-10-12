import React from 'react'
import TableHeader from '../common/TableHeader'
import Like from "../common/Like"
import TableBody from '../common/TableBody';

const MoviesTable = (props) => {
    const columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        { key: "like" },
        { key: "delete" },
    ];
    const { movies, onDelete, onFavourite, onSort, sortColumn } = props

    return (
        <div className="movie-list">
            <table className="table">
                <TableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={movies}
                    onFavourite={onFavourite}
                    onDelete={onDelete}
                    columns={columns}
                />
            </table>
        </div >
    )
}

export default MoviesTable