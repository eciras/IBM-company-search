import React from "react";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import { useState } from 'react';


function Card({ company }) {


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);


    return (
        <div className="card">
            <label>{company.name}</label>
            <label>{company.country}</label>
            <label>{company.currency}</label>
            <label>{company.weburl}</label>


            <DateRange className="datePicker"
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />



        </div>
    )
}

export default Card;