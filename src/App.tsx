import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
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
        console.log(response.data.items);
        setSearchResults(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
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
      <h4 className="text-center">GitHub finder</h4>
      <form className="search-div form-group" onSubmit={runSearch}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="form-control"
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
