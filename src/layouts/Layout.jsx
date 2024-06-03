import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet  />
    </>
  );
};

export default Layout;