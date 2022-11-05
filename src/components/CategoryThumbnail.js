import React from 'react';
import {Link} from 'react-router-dom';

export default function CategoryThumbnail() {
  return (
    <div className="categoryThumbnail">
      <div className="thumbImgContainer">
        <Link to="/plants/name">
          <img className="thumbImg" src="/thumbnail_1.jpg" alt="thumbnail" />
          <div className="thumbCard">
            <h1 className="thumCardTxt">ALL PLANTS</h1>
          </div>
        </Link>
      </div>
      <div className="thumbImgContainer">
        <Link to="/plants/name">
          <img className="thumbImg" src="/thumbnail_2.jpg" alt="thumbnail" />
          <div className="thumbCard">
            <h1 className="thumCardTxt">NEW ARRIVAL PLANTS</h1>
          </div>
        </Link>
      </div>
      <div className="thumbImgContainer">
        <Link to="/plants/category/Accessories">
          <img className="thumbImg" src="/thumbnail_3.jpg" alt="thumbnail" />
          <div className="thumbCard">
            <h1 className="thumCardTxt">PLANT ACCESSORIES</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}
