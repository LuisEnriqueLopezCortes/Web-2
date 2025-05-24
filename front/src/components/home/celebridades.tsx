
import "../../css/celebridades.css";
const movies = [
  {
    id: 1,
    name: "Movie Name",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%201.png",
  },
  {
    id: 2,
    name: "Movie Name",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
  },
  {
    id: 3,
    name: "Movie Name",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%203.png",
  },
  {
    id: 4,
    name: "Movie Name",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%204.png",
  },
  {
    id: 5,
    name: "Movie Name",
    image:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%205.png",
  },
];

export const Celebridades = () => {
  return (
    <div className="container">
      {movies.map((movie) => (
        <div key={movie.id} className="image-wrapper">
          <img src={movie.image} alt={movie.name} className="image" />
          <h2 className="text-white">{movie.name}</h2>
        </div>
      ))}
    </div>
  );
};

