import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import LogUserActions from "./LogUserActions";

function Card({ company }) {
  let today = new Date();
  let weekBack = new Date(today);
  weekBack.setDate(weekBack.getDate() - 7);

  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: weekBack,
      key: "selection",
    },
  ]);

  const [stockData, setStockData] = useState({});
  const dateFormat = { year: "2-digit", month: "2-digit", day: "2-digit" };

  const searchStocks = (e) => {
    console.log(date);
    axios
      .get(
        "https://finnhub.io/api/v1/stock/candle?symbol=" +
          company.ticker +
          "&resolution=1&from=" +
          ~~(date[0].startDate.getTime() / 1000) +
          "&to=" +
          ~~(date[0].endDate.getTime() / 1000) +
          "&token=cbkj62iad3i8o8768nog"
      )
      .then((res) => {
        setStockData(res.data);
        const logData = {
          startDate: date[0].startDate,
          endDate: date[0].endDate,
          price: res.data.c,
        };
        LogUserActions(
          "Comany data stock data retrieved ",
          JSON.stringify(logData)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container text-center">
      <div className="row mb-3">
        <ul className="col companyInfo">
          <div className="smallText">Info about selected company:</div>
          <li onClick={searchStocks} className="pointer col">
            {company.name}
          </li>
          <li className="col pointer">
            <a href={company.weburl} target="_blank" rel="noreferrer">
              {company.weburl}
            </a>
          </li>
          <li className="col">{company.country}</li>
          <li className="col">{company.currency}</li>
        </ul>
        <div className="col">
          <div className="col">
            <p className="m-0 smallText">
              Select date range and click on company name
            </p>
            <DateRange
              className="datePicker"
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              ranges={date}
            />
          </div>
        </div>
      </div>

      <div className="stockChart">
        <div className={stockData.t == null ? "hideEl" : "showEl"}>
          <Plot
            data={[
              {
                x:
                  stockData.t == null
                    ? []
                    : stockData.t.map((e) =>
                        Intl.DateTimeFormat("en-US", dateFormat).format(
                          e * 1000
                        )
                      ),
                y: stockData.h,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "#D612A9" },
                color: "red",
              },
            ]}
            layout={{
              autosize: true,
              width: "100%",
              height: "100%",
              title: company.name,
              paper_bgcolor: "#1b1285",
              plot_bgcolor: "#1b1285",
              font: {
                family: "Cormorant SC, serif",
                size: 20,
                color: "whitesmoke",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;