import React from "react";

const HelloCard = ({ text, onNext }) => {
  return (
    <div className="hello-card">
      <h2 className="hello-card__title">{text}</h2>
      <button className="btn-outline" onClick={onNext}>
        Сменить текст
      </button>
    </div>
  );
};

export default HelloCard;
