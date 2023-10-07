import React from 'react';
import AppBar from './components/AppBar';
import Footer from './components/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;