
import './App.css';

import MainPage from './Components/MainPage';



function App() {

//   const FinnURL = 'https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cbkj62iad3i8o8768nog';
//   const [companyName, setCompanyName] = useState('');
  
// const handleChange = (e) => {
//   setCompanyName(e.target.value)
// }

// const onSearch = (searchTerm) => {
//  console.log("search ", searchTerm);
// }


  // useEffect(() => {
  //   axios.get(FinnURL)
  //     .then(res => { 
  //       setCompanyName(res.data)
  //     })
      
  // }, [FinnURL])

  // const finnhub = require('finnhub');

  // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  // api_key.apiKey = "cbkj62iad3i8o8768nog"
  // const finnhubClient = new finnhub.DefaultApi()

  // finnhubClient.companyProfile2({ 'symbol': 'AAPL' }, (error, data, response) => {
  //   console.log(data)
  // });
  // fetch('https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cbkj62iad3i8o8768nog')
  //   .then(response => response.json())
  //   .then(data => {
  //     document.querySelector('h1').innerText = data.company;
  //   });

  // const com = companyName.map((companyName, index) => {
  //   return (
  //     <ul>{companyName.name}</ul>
  //   )
  // }) 


  // return (
  //   <div className="App">
  //     <h1>Company search</h1>
  //     <input type="text" value={companyName} onChange={handleChange}/>
  //     <button onClick={() => onSearch(companyName)}>Search</button>
     
  //     <div>
  //     <h3>
   
      
  //     </h3>

  //     </div>

  //   </div>
  // );


  return (

    <MainPage></MainPage>
  )




}

export default App;


