import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import LogUserAction from "./Logger";

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
        console.log(res.data);
        const logData = {
          startDate: date[0].startDate,
          endDate: date[0].endDate,
          price: res.data.c,
        };
        LogUserAction(
          "Comany data stock data retrieved ",
          JSON.stringify(logData)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card col">
      <div className="row align-items-start">
        <div className="col">
          <label onClick={searchStocks} className="pointer">
            {company.name}
          </label>
        </div>
        <div className="col">
          <label>{company.weburl}</label>
        </div>
        <div className="col">
          <label>{company.country}</label>
        </div>
        <div className="col">
          <label>{company.currency}</label>
        </div>
        <div className="col">
          <DateRange
            className="datePicker"
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Plot
            data={[
              {
                x:
                  stockData.t == null
                    ? []
                    : stockData.t.map((unix) =>
                        Intl.DateTimeFormat("en-US", dateFormat).format(
                          unix * 1000
                        )
                      ),
                y: stockData.h,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 620, height: 440, title: "A Fancy Plot" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
