import React from 'react';
import Table from '../common/Table';
import Like from '../common/Like';
import { Link } from 'react-router-dom';

const MoviesTable = (props) => {
    const { movies, onFavourite, onDelete, onSort, sortColumn } = props;

    const columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre', },
        { path: 'numberInStock', label: 'Stock', },
        { path: 'dailyRentalRate', label: 'Rate', },
        {
            key: 'like',
            content: movie => (
                <Like liked={movie.isFavourite} onFavourite={() => onFavourite(movie)} />
            ),
        },
        {
            key: 'delete',
            content: movie => (
                <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
                    Delete
                </button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={movies}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
};

export default MoviesTable;
