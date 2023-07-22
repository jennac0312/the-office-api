import './App.css';
import axios from 'axios'; //similar to fetch but better
import { useState, useEffect } from 'react';
import Rating from './components/Rating';

function App() {

  const [data, setData] = useState(null)

  const getData = async () => {
    let response = await axios.get(`http://api.tvmaze.com/shows/526`)
        // .then((res) => console.log(res.data)) if you dont use async
    let info = await response.data
    console.log(info)

    setData(info)
  }


  useEffect(() => {
    getData()
  }, [])


  const loaded = () => {
    return (
      <div className="App">
        <h1>{data.name}</h1>
        <img src={data.image.medium}/>
        <p dangerouslySetInnerHTML={{__html: data.summary}}></p>
        {/* works but dont recommend... its dangerous duh */}
        <Rating rate={data.rating.average}/>
      </div>
    )
  }

  const loading = () => {
    <h1> content is loading ...</h1>
  }

  //  the ? trick (thanks pedro ep 7 24:00)
  // return (
  //   <div className="App">
  //     <h1>{data?.name}</h1>
  //     <img src={data?.image.medium}/>
  //     {data?.summary}
  //     <Rating rate={data?.rating.average}/>
  //   </div>
  // );

  return data ? loaded() : loading()
}

export default App;
