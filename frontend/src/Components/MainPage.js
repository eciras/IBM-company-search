import React from "react";
import Card from "./Card";
import axios from "axios";
import { useState } from "react";
import LogUserActions from "./LogUserActions";

function isSearchValid(search) {
  return /^[a-zA-Z ]{1,35}$/g.test(search);
}

function MainPage() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const performSearch = () => {
    if (isSearchValid(search) === true) {
      axios
        .get(
          "https://finnhub.io/api/v1/stock/profile2?token=cbkj62iad3i8o8768nog&symbol=" +
            search
        )
        .then((res) => {
          setCompany(res.data);
          LogUserActions("Comany data retrieved ", res.data.name);
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMessage(
        "Company name must be letters only and less than 35 symbols!"
      );
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const searchCompany = (e) => {
    performSearch();
  };

  return (
    <>
      <div className="container">
        <div className="col">
          <h1>Find All Companies In One Place</h1>
          <h6 className="smallText">Search engine</h6>
          <div className="col-">
            <div
              className={isSearchValid(search) === true ? "hideEl" : "showEl"}
            >
              {errorMessage}
            </div>
            <div className="row mx-auto">
              <input
                className="form-control col-9"
                type="text"
                placeholder="Enter company name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={onEnter}
              ></input>
              <button
                type="button"
                onClick={searchCompany}
                className="btn btn-primary col-3 mb-3"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <Card company={company}></Card>
        </div>
      </div>
    </>
  );
}

export default MainPage;