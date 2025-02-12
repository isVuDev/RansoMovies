import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {
  const state = useSelector((state) => state.listMovieReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListMovie());
  }, []);

  const renderListMovie = () => {
    const { data } = state;

    return data?.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
  };

  if (state.loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1>ListMoviePage</h1>
      <div className="grid grid-cols-4 gap-5">{renderListMovie()}</div>
    </div>
  );
}
