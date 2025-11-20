import React from "react";

const Review = ({ comment }) => {
  return (
    <div className="col-12 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{comment.nameUser}</h5>
          <p class="card-text">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
