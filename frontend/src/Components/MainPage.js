import React from "react";
import Card from './Card'
import axios from 'axios';
import { useState, useEffect } from 'react';

function isSearchValid(search) {
    return /^[a-zA-Z]{1,35}$/g.test(search)
}

function MainPage() {

    const [search, setSearch] = useState('');
    const [company, setCompany] = useState('');
    const searchCompany = (e) => {

        if (!isSearchValid(search) == true) {
            alert("bad")
        } else {
        
        
            axios.get('https://finnhub.io/api/v1/stock/profile2?token=cbkj62iad3i8o8768nog&symbol='+search)
            .then(res => { 
                setCompany(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))

        }

    }

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>Find your Comapny</h1>
                </div>
                <div className="row2">
                    <h2>Company search</h2>
                    <div className="search">
                        <input type='text'
                            placeholder='Enter company name'
                            value={search} 
                            onChange={e => setSearch(e.target.value)}></input>
                        <button onClick={searchCompany}>Search</button>
                    </div>
                    
                </div>

            </div>
            <div className="container" >
                <Card company={company}></Card>
            </div>
        </>
    )
}

export default MainPage;