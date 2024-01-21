import React from 'react';
import NavBar from '../../components/navbar/navbar.jsx';
import Header from '../../components/header/header.jsx';
import Featured from '../../components/featured/featured.jsx';
import SseComponent from '../../components/SseComponent'; // Adjust the path accordingly
import "./home.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <div className="ads"><SseComponent /> </div>
        
      </div>
    </div>
  );
};

export default Home;