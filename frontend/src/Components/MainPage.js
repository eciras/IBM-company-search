import React from "react";
import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";

function isSearchValid(search) {
  return /^[a-zA-Z ]{1,35}$/g.test(search);
}

function MainPage() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchCompany = (e) => {
    e.preventDefault();
    if (isSearchValid(search) === true) {
      axios
        .get(
          "https://finnhub.io/api/v1/stock/profile2?token=cbkj62iad3i8o8768nog&symbol=" +
            search
        )
        .then((res) => {
          setCompany(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMessage(
        "Company name must be letter only and less than 35 symbols!"
      );
    }
  };

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>Find more about your Company</h1>
        </div>
        <div className="row2">
          <h2>Search engine</h2>
          <div className="search">
            <div
              className={isSearchValid(search) === true ? "noError" : "error"}
            >
              {errorMessage}
            </div>

            <input
              type="text"
              placeholder="Enter company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button onClick={searchCompany}>Search</button>
          </div>
          <div className="container">
            <Card company={company}></Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
