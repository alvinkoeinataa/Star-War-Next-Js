import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Vehicle = () => {
  const [dataVehicle, setDataVehicle] = useState([]);
  const [dataCount, setDataCount] = useState({ count: 0 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dataFound, setDataFound] = useState(true);
  const [originalDataVehicle, setOriginalDataVehicle] = useState([]); // State untuk data asli
  const router = useRouter();

  const fetchData = (page) => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/vehicles/?page=${page}`)
      .then((response) => {
        setOriginalDataVehicle(response.data.results); // Set original data
        setDataVehicle(response.data.results);
        setDataCount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error, reload the page!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < dataCount.count) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      axios
        .get(`https://swapi.dev/api/vehicles/?search=${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data.results);
          setDataFound(response.data.results.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          alert("Error, reload the page!");
          setLoading(false);
        });
      // Hapus baris ini sehingga nilai searchTerm tetap ada
      // setSearchTerm("");
    } else {
      setSearchResults([]);
      setDataFound(true);
    }
  };

  const handleReset = () => {
    setSearchResults([]); // Kosongkan hasil pencarian
    setDataFound(true); // Set data ditemukan ke true
    setDataVehicle(originalDataVehicle); // Kembalikan data ke data asli

    setSearchTerm("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="container mx-auto px-24 py-6 ">
        <h1 className="flex justify-center mb-6 text-2xl sm:text-3xl text-bold">STAR WAR VEHICLES</h1>
        <h1 className="flex justify-center mb-6 text-lg sm:text-xl">There are total {dataCount.count} vehicles in STAR WAR WORLD</h1>
        <div className="flex mb-4 sm:p-0 ml-4">
          <div className="sm:flex-row">
            <input type="text" placeholder="Search Vehicle" className="border rounded p-2 mr-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />

            <button className="bg-blue-700 p-3 mt-2 rounded text-white mr-4 " onClick={handleSearch}>
              Search
            </button>
            {(searchResults.length > 0 || !dataFound) && (
              <button className="bg-green-700 py-3 px-4 rounded text-white mt-2" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : (
          <div>
            {dataFound || searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {searchResults.length > 0
                  ? searchResults.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-lg shadow-lg p-4 mx-4 cursor-pointer transition hover:shadow-xl"
                        onClick={() => {
                          const data = item.url.split("/");
                          const vehicleId = data[5];
                          router.push(`/vehicle/${vehicleId}`);
                        }}
                      >
                        <p className="text-2xl font-semibold text-white">{item.name}</p>
                      </div>
                    ))
                  : dataVehicle.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-lg shadow-lg p-4 mx-4 cursor-pointer transition hover:shadow-xl"
                        onClick={() => {
                          const data = item.url.split("/");
                          const vehicleId = data[5];
                          router.push(`/vehicle/${vehicleId}`);
                        }}
                      >
                        <p className="text-2xl font-semibold text-white">{item.name}</p>
                      </div>
                    ))}
              </div>
            ) : (
              <h1 className="text-red-600 text-2xl pl-6">Data not found</h1>
            )}
            {searchResults.length === 0 &&
              dataFound && ( // Hanya tampilkan tombol Previous dan Next jika data ditemukan
                <div className="mt-4 flex items-center justify-center">
                  <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-black hover-bg-blue-600 text-white font-bold py-2 px-4 rounded mr-6">
                    Previous
                  </button>
                  <div className="mr-6">Page {currentPage}</div>
                  <button onClick={handleNextPage} disabled={currentPage === dataCount.count} className="bg-black hover-bg-blue-600 text-white font-bold py-2 px-8 rounded">
                    Next
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicle;
