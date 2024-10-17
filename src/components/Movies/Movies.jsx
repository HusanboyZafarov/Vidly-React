import React, { Component } from "react"
import ListGroup from "../common/listGroup"
import Pagination from "../common/Pagination"
import MoviesTable from "../MoviesTable/MoviesTable"
import SearchBox from "../common/SearchBox"
import { paginate } from "../../utils/paginate"
import { getMovies } from "../../services/fakeMovieService"
import { getGenres } from "../../services/fakeGenreService"
import { Link } from 'react-router-dom';
import _ from "lodash"

import './Movies.css'

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {
            path: "title",
            order: "asc"
        },
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]
        this.setState({
            movies: getMovies(),
            genres,
        })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({
            movies,
        })
    };

    handleFavourite = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].isFavourite = !movie.isFavourite;
        this.setState({
            movies,
        })
    }

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
            searchQuery: ""
        })
    }

    handlePageChange = (page) => {
        const currentPage = page
        this.setState({ currentPage })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPageData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies,
            searchQuery
        } = this.state;
        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;


        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, movies }
    }

    render() {
        const {
            pageSize,
            currentPage,
            sortColumn,
            genres,
            searchQuery
        } = this.state;

        const { totalCount, movies } = this.getPageData()

        return (
            <div className="row" >
                <div className="col-2">
                    <ListGroup
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
                        New Movie
                    </Link>
                    <p>Showing {totalCount} movies in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable
                        movies={movies}
                        onDelete={this.handleDelete}
                        onFavourite={this.handleFavourite}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        )
    }

}

export default Movies