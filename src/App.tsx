import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { IGitUsers } from "./interfaces/IGitUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import ResultsList from "./resultsList/resultsList";
import PaginationComponent from "./resultsList/pagination";
import ReactPaginate from "react-paginate";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IGitUsers[] | []>([]);

  const runSearch = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .get<AxiosResponse>(
        `https://api.github.com/search/users?q=${searchTerm}&page=1`
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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log(searchResults);
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
