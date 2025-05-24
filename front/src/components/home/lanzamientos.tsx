import "../../css/lanzamientos.css";
const movies = [
  {
    id: 1,
    name: "Movie Name",
    description:"Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere.",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%201.png",
  },
  {
    id: 2,
    name: "Movie Name",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere.",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
  },
  {
    id: 3,
    name: "Movie Name",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere.",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%203.png",
  },
  {
    id: 4,
    name: "Movie Name",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere.",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%204.png",
  },
  {
    id: 5,
    name: "Movie Name",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere.",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%205.png",
  },
  {
    id: 6,
    name: "Movie Name",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere.",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%206.png",
  },
];

export const CardLanzamientos = () => {
  return (
    <div className="d-flex justify-content-center movies-list">
      <div className="card-container-peliculas">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-64 card-container-information"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-80 object-cover card-img-link"
            />
            <div className="p-4 card-body-information">
              <h2 className="text-lg font-bold name-movie">{movie.name}</h2>
              <p className="text-sm text-gray-400 description-movie">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
