import React, { Component } from "react"
import ListGroup from "../common/listGroup"
import Pagination from "../common/Pagination"
import MoviesTable from "../MoviesTable/MoviesTable"
import { paginate } from "../../utils/paginate"
import movies, { getMovies } from "../../services/fakeMovieService"
import { getGenres } from "../../services/fakeGenreService"
import _ from "lodash"

import './Movies.css'

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: "",
        sortColumn: {
            path: "title",
            order: "asc"
        }
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
        })
    }

    handlePageChange = (page) => {
        const currentPage = page
        this.setState({ currentPage })
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
        } = this.state;


        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies
        const {
            pageSize,
            currentPage,
            sortColumn,
            genres,
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
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={movies}
                        onDelete={this.handleDelete}
                        onFavourite={this.handleFavourite}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                        columns={this.columns}
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