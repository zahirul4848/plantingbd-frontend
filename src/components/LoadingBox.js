import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function LoadingBox() {
  return (
    <div className="loading">
      <ClipLoader loading={true} color="#00B761" size={20} />
    </div>
  )
}
