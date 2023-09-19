import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const VehicleDetail = () => {
  const [dataVehicle, setDataVehicle] = useState({});
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const router = useRouter();

  const fetchData = () => {
    setLoading(true); // Menandakan bahwa sedang loading
    axios({
      method: "get",
      url: `https://swapi.dev/api/vehicles/${router.query.id}/`,
    })
      .then((response) => {
        console.log(response.data);
        setDataVehicle(response.data);
        fetchFilms(response.data);
        setLoading(false); // Loading selesai ketika data diterima
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
        setLoading(false); // Loading selesai dengan kesalahan
      });
  };

  const fetchFilms = async (dataFetch) => {
    try {
      const filmPromises = dataFetch.films.map(async (url) => {
        const resp = await axios.get(url);
        return resp.data;
      });
      const filmData = await Promise.all(filmPromises);
      setFilms(filmData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchData();
    }
  }, [router.query.id]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4 p-4 ">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">{dataVehicle?.name}</h1>
            <div className="mb-2 text-lg">
              <span className="font-semibold ">Model:</span> {dataVehicle?.model}
            </div>
            <div className="mb-2 text-lg">
              <span className="font-semibold">Length:</span> {dataVehicle?.length}
            </div>
            <div className="mb-2 text-lg">
              <span className="font-semibold">Passengers:</span> {dataVehicle?.passengers}
            </div>
            <div className="mb-2 text-lg">
              <span className="font-semibold">Crew:</span> {dataVehicle?.crew}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Films:</h2>
              <ul className="list-disc list-inside pl-4">
                {films.map((film) => (
                  <li key={film.url} className="font-thin text-black text-lg hover:underline cursor-pointer">
                    {film.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetail;
