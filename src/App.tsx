import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IGitUsers } from "./interfaces/IGitUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import ResultsList from "./components/resultsList";
import PaginationComponent from "./components/pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IGitUsers[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const runSearch = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .get<AxiosResponse>(
        `https://api.github.com/search/users?q=${searchTerm}&page=${currentPage}`
      )
      .then((response: any) => {
        setSearchResults(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Please enter a correct input and press enter to search", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };

  // Get current posts
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <ToastContainer />
      <h4 className="text-center">GitHub finder</h4>
      <form className="search-div form-group" onSubmit={runSearch}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="form-control"
          placeholder="Enter a keyword and press enter to search..."
        />
      </form>

      <ResultsList searchResults={currentPosts} loading={loading} />
      {searchResults.length ? (
        <PaginationComponent
          postsPerPage={postsPerPage}
          totalPosts={searchResults.length}
          paginate={paginate}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
