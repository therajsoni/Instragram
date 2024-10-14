import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ExploreAllData = () => {

const [data,setData] = useState([]);

const user = useSelector((store)=>store.auth);

const id = user?._id;

useEffect(()=>{
    const fetchAllBlogData = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/user/6709767b21f8d7ffe3809d17/getblog`);
            const allData = await response.json(); 
            setData(allData.blogs); 
          } catch (error) {
            console.error("Error fetching blog data:", error);
          }
        };
       if (id) {
      fetchAllBlogData();
    }
},[id]);

console.log(data);


  return (
    <div>
        {data && data.length > 0 ? (
        data.map((i, index) => (
          <div key={i._id}>
            <h3>{i.title}</h3>
            <p>{i.description}</p>
            <p>{i.text}</p>
          </div>
        ))
      ) : (
        <p>No blogs found</p>
      )}

    </div>
  )
}

export default ExploreAllData
