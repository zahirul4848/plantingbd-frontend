import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function Cover() {
  return (
    <div className="coverBtnPosition">
      <Slider dots={true} infinite={true} speed={3000} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={5000} pauseOnHover={true}>
        <div className="cover">
          <img className="coverImg" src="/cover_1.jpg" alt="Barromplant" />
        </div>
        <div className="cover">
          <img className="coverImg" src="/cover_2.jpg" alt="Corn Plant" />
        </div>
        <div className="cover">
          <img className="coverImg" src="/cover_3.jpg" alt="Saxifraga" />
        </div>
        <div className="cover">
          <img className="coverImg" src="/cover_4.jpg" alt="flower" />
        </div>
      </Slider>
      <Link to="/plants/name" className="coverBtn">VIEW PLANTS</Link>
    </div>
  )
}
