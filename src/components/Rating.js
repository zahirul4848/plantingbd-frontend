import React from 'react';
import { Star, StarHalf, StarOutline } from '@material-ui/icons';

export default function Rating(props) {
  const {rating, numReviews, caption} = props;
  return (
    <div className="rating">
      {rating >= 1 ? <Star/> : rating >= 0.5 ? <StarHalf/> : <StarOutline/>}
      {rating >= 2 ? <Star/> : rating >= 1.5 ? <StarHalf/> : <StarOutline/>}
      {rating >= 3 ? <Star/> : rating >= 2.5 ? <StarHalf/> : <StarOutline/>}
      {rating >= 4 ? <Star/> : rating >= 3.5 ? <StarHalf/> : <StarOutline/>}
      {rating >= 5 ? <Star/> : rating >= 4.5 ? <StarHalf/> : <StarOutline/>}
      {caption ? <span>{caption}</span> : <span>({numReviews})</span>}
    </div>
  )
}