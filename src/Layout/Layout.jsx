import React from 'react';
// import DrawerAppBar from '../components/DrawerAppBar';
import Header from '../components/Header';

const Layout = ({children}) => {
    return (
        <>
        <header>
            <Header/>
        </header>
        <main>
            {children}
        </main>
        </>
    );
};

export default Layout;