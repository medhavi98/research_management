import React from 'react';
import AppNavigation from '../NavigationBar/AppNavigation';

const Layout = ({children}) => {

  return (
    <div className='root'>        
        <AppNavigation />
        <main className='children-wrapper'>
            {children}
        </main>
    </div>
  )
}

export default Layout