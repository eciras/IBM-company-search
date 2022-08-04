import React from "react";

function Card({company}) {


    return (
        <div className="card">
            <img src={company.logo}></img>
            <label>{company.name}</label><br />
            <label>{company.weburl}</label>
        </div>
    )
}

export default Card;