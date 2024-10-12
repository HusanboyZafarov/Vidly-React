import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Action",
    },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    isFavourite: false,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Action",
    },
    numberInStock: 5,
    dailyRentalRate: 2.0,
    isFavourite: true,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471820",
      name: "Thriller",
    },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    isFavourite: false,
    publishDate: "2017-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Inception",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471820",
      name: "Thriller",
    },
    numberInStock: 7,
    dailyRentalRate: 3.0,
    isFavourite: true,
    publishDate: "2010-07-16T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471822",
    title: "The Dark Knight",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Action",
    },
    numberInStock: 10,
    dailyRentalRate: 4.0,
    isFavourite: false,
    publishDate: "2008-07-18T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471823",
    title: "The Matrix",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471818",
      name: "Action",
    },
    numberInStock: 4,
    dailyRentalRate: 2.5,
    isFavourite: false,
    publishDate: "1999-03-31T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471824",
    title: "Joker",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471820",
      name: "Thriller",
    },
    numberInStock: 3,
    dailyRentalRate: 3.8,
    isFavourite: false,
    publishDate: "2019-10-04T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471825",
    title: "Avatar",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471819",
      name: "Sci-Fi",
    },
    numberInStock: 6,
    dailyRentalRate: 3.2,
    isFavourite: false,
    publishDate: "2009-12-18T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471826",
    title: "Interstellar",
    genre: {
      _id: "5b21ca3eeb7f6fbccd471819",
      name: "Sci-Fi",
    },
    numberInStock: 5,
    dailyRentalRate: 3.6,
    isFavourite: false,
    publishDate: "2014-11-07T19:04:28.809Z",
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.getGenres().find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}

export default movies;
