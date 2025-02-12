import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie } from "./slice";
import { useEffect } from "react";

export default function DetailMoviePage() {
  const state = useSelector((state) => state.detailMovieReducer);
  const { data } = state;
  const { id } = useParams();
  const disptach = useDispatch();

  useEffect(() => {
    disptach(fetchDetailMovie(id));
  }, []);

  if (state.loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1>DetailMoviePage</h1>
      <div className="grid grid-cols-2">
        <div>
          {data && <img className="rounded-t-lg" src={data.hinhAnh} alt="" />}
        </div>
        <div>
          {data && (
            <div>
              <h2>{data.tenPhim}</h2>
              <p>{data.moTa}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
