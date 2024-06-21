import React from 'react';

const HeaderComponents = ({ title, subtitle }) => {
  return (
    <header className="mt-2">
      <h1 className="fs-4 fw-bold mb-0">{title}</h1>
      <h2 className="fs-5 fw-light mb-2">{subtitle}</h2>
      <hr />
    </header>
  );
};

export default HeaderComponents;
