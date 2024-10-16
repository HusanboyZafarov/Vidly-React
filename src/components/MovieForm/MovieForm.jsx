import { useParams, useNavigate } from 'react-router-dom';
import Form from '../common/Form';
import Joi from 'joi-browser';
import { getGenres } from './../../services/fakeGenreService';
import { getMovies, saveMovie } from './../../services/fakeMovieService';

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: getGenres(),
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Numbers in stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Daily Rental Rate")
    }

    async componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const { id: movieId } = this.props.params;
        if (movieId === "new") return;

        const movie = getMovies(movieId);
        if (!movie) {
            this.props.navigate("/not-found");
            return;
        }

        this.setState({
            data: this.mapToViewModel(movie)
        });
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id || Date.now().toString(),
            title: movie.title || "",
            genreId: (movie.genre && movie.genre._id) ? movie.genre._id : "",
            numberInStock: movie.numberInStock || 0,
            dailyRentalRate: movie.dailyRentalRate || 0,
        };
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.navigate("/movies");
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default function MovieFormWithRouter(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <MovieForm {...props} params={params} navigate={navigate} />;
}