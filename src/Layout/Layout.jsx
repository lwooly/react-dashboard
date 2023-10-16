import React from 'react';
// import DrawerAppBar from '../components/DrawerAppBar';
import Header from '../components/Header';

const Layout = ({children}) => {
    return (
        <>
        <header>
            <Header/>
        </header>
        <main style={{paddingTop: 25, backgroundColor:'#F4F1DE', minHeight: '100vh'}}>
            {children}
        </main>
        </>
    );
};

export default Layout;