import React from 'react';
// import DrawerAppBar from '../components/DrawerAppBar';
import Header from '../components/Header';

const Layout = ({children}) => {
    return (
        <>
        <header>
            <Header/>
        </header>
        <main style={{marginTop: 54}}>
            {children}
        </main>
        </>
    );
};

export default Layout;