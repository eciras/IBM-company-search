import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import axios from "axios";

function Card({ company, search }) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [stockData, setStockData] = useState("");

  const searchStocks = (e) => {
    axios.get("https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1631022248&to=1631627048&token=")
    .then((res) => {
        setStockData(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="card">
      <div className="companyInfo">
        <label onClick={searchStocks} className="pointer">{company.name}</label>
        <label>{company.weburl}</label>
        <br />
        <label>{company.country}</label>      
        <label>{company.currency}</label>
     
        
      </div>

      <div>
        <DateRange
          className="datePicker"
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
      </div>
    </div>
  );
}

export default Card;
