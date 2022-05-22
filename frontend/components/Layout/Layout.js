import React, { useState } from 'react';
import AppNavigation from '../NavigationBar/AppNavigation';

const Layout = ({children}) => {
  const [focus, setFocus] = useState("Dashboard");
  const onClick = componentName => {
    console.log('click', componentName);
    setFocus(componentName);
  }
  return (
    <div className='root'>        
        <AppNavigation onClickItem={onClick}/>
        <main className='children-wrapper'>
            {/* {children} */}
            {focus === "Dashboard" ? <h2>Dashboard</h2> : ''}
            {focus === "Group Details" ? <h2>Group Details</h2> : ''}
        </main>
    </div>
  )
}

export default Layout