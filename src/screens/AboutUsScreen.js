import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {Helmet} from 'react-helmet-async';

export default function AboutUsScreen() {
  return (
    <div>
      <Helmet>
        <title>About Us | Plantingbd.com</title>
      </Helmet>
      <Header/>
      <div className="commonScreenContainer">
        <img src="/coveraboutus.jpg" alt="coveraboutus" className="aboutuscover" />
        <div className="aboutUsCont">
          <h1 className="bigTitle">OUR STORY</h1>
          <p>We’re plantingbd.com, a team with a passion for delivering a huge collection of plants and sharing our love of your favorite plants. Our site is relatively new, but our experience is lot.</p>
          <p>Our team has over 15 years of experience sourcing plants and is always on the lookout for the latest plants and trends.</p>
          <p>We collaborate with growers across the country to gather a wide variety of fresh, beautiful plants, from classic standards to on-trend faves, shipping straight from the garden to arrive at your front door.</p>
          <p>Our goal is to help spread the joy of plants and make everyone’s experience a positive one. We know some plants and room environments can be tricky. But don’t worry. We are here to help the plant experience and make it a joyful one. Beauty. Grow!</p>
        </div>
        <div className="row center">
          <img className="delivery" src="/planting_logo_sm.png" alt="golapnursery" />     
        </div>    
      </div>
      <Footer/>
    </div>
  )
}
