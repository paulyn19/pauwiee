// mockData.js
const MOVIES = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi / Thriller',
    year: 2010,
    rating: 8.8,
    director: 'Christopher Nolan',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    duration: '2h 28min',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    genre: 'Action / Crime',
    year: 2008,
    rating: 9.0,
    director: 'Christopher Nolan',
    cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    duration: '2h 32min',
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  },
  {
    id: '3',
    title: 'Interstellar',
    genre: 'Sci-Fi / Drama',
    year: 2014,
    rating: 8.7,
    director: 'Christopher Nolan',
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    duration: '2h 49min',
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: '4',
    title: 'Parasite',
    genre: 'Thriller / Drama',
    year: 2019,
    rating: 8.5,
    director: 'Bong Joon-ho',
    cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
    duration: '2h 12min',
    description:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
  },
  {
    id: '5',
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    year: 1994,
    rating: 9.3,
    director: 'Frank Darabont',
    cast: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    duration: '2h 22min',
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  },
  {
    id: '6',
    title: 'Spirited Away',
    genre: 'Animation / Fantasy',
    year: 2001,
    rating: 8.6,
    director: 'Hayao Miyazaki',
    cast: 'Daveigh Chase, Suzanne Pleshette, Miyu Irino',
    duration: '2h 5min',
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
  },
  {
    id: '7',
    title: 'The Godfather',
    genre: 'Crime / Drama',
    year: 1972,
    rating: 9.2,
    director: 'Francis Ford Coppola',
    cast: 'Marlon Brando, Al Pacino, James Caan',
    duration: '2h 55min',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  },
  {
    id: '8',
    title: 'Everything Everywhere All at Once',
    genre: 'Sci-Fi / Comedy',
    year: 2022,
    rating: 7.8,
    director: 'Daniel Kwan, Daniel Scheinert',
    cast: 'Michelle Yeoh, Ke Huy Quan, Jamie Lee Curtis',
    duration: '2h 19min',
    description:
      'A middle-aged Chinese immigrant is swept up in an insane adventure in which she alone can save existence by exploring other universes.',
  },
];

export const GENRES = ['All', 'Sci-Fi', 'Drama', 'Action', 'Thriller', 'Animation', 'Crime', 'Comedy'];
export default MOVIES;
