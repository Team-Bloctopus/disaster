import React, { useState, useEffect } from 'react';
import './newsfeed.css';
import bhuj from '../styles/assets/data/bhuj.svg';
import {  useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context';
const Newsfeed = () =>
{
    
  const [isLoading, setIsLoading] = useState(false);
        const [disasters, setdisasters] = useState([]);
        const { address, contract, getDisasters } = useStateContext();
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const data = await getDisasters();
            setdisasters(data);
            setIsLoading(false);
          } catch (error) {
            console.log("Error fetching news data:", error);
          }
        };
        useEffect(() => {
          // Fetch news data from the backend API
        if(contract) fetchData();
          
        }, [address, contract]); 
        const navigate = useNavigate();

        const handleClick = () => {
            navigate('./desc')
            // Perform additional actions or update component state here
          };
          const handleNavigate = (post) => {
          
            navigate( `./desc/${post?.name}`, { state: post })
            console.log(post)
            //navigate(`/post-details/${post.title}`, { state: post });
          };

    return (
        <div>
            {!isLoading && disasters?.length === 0 && (
          <p >
            You have not created any campigns yet
          </p>
        )}
    {/*<h2>News Feed</h2> 
        {newsData.map((newsItem) => (
        <div key={newsItem.id}>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.content}</p>
          </div>
        ))}*/}
        <div className='feed'>
        {!isLoading && disasters?.length > 0 &&
      disasters.map((disaster, i) => (
        // { disaster.title === "bhuje" && (
        //   <p >
        //     You have not created any campigns yet
        //   </p>
        // )},
        <NewsDisplay key={i} title={disaster.name} image={disaster.image} description={disaster.description} scale={disaster.scale}
        handleClick={()=>handleNavigate(disaster)}
        
        
        />
        
       
      ))
    }
          
        {/* <div className='news' onClick={handleClick}>
            <img src={bhuj} alt='bhuj-earthquake'></img>
            <div className='content'>
         <h1>Catastrophic Earthquake Strikes Bhuj</h1>
            <p>Immediate assistance needed</p>
            </div>
          </div> */}
          {/* <div className='news' onClick={handleClick}>
            <img src={bhuj} alt='bhuj-earthquake'></img>
            <div className='content'>
         <h1>Catastrophic Earthquake Strikes Bhuj</h1>
            <p>Immediate assistance needed</p>
            </div>
          </div> */}
          {/* <div className='news' onClick={handleClick}>
            <img src={bhuj} alt='bhuj-earthquake'></img>
            <div className='content' >
         <h1>Catastrophic Earthquake Strikes Bhuj</h1>
            <p>Immediate assistance needed</p>
            </div>
          </div> */}
          </div>
      </div>
    );
  }
       
export default Newsfeed;

const NewsDisplay = ({title , image , description, scale , handleClick }) =>
{
    
      //  console.log(title)
  // const [titleD, setTitleD] = useState("");


        // const handleClick = () => {
        //  // console.log(title)
        //     navigate(`./desc/${title}` )
        //     // Perform additional actions or update component state here
        //   };


    return (
     // console.log({title}),
      <div className='news' onClick={handleClick}>
      <img src={image} alt='bhuj-earthquake'></img>
      <div className='content'>
   <h1>{title}</h1>
      <p>{description}</p>
      </div>
    </div>
    );
  }