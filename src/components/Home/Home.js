import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import styles from './Home.css';


const Home = () => (
    <div>
        <Header />
        <Main>
            <div className={styles.home}>
                <div className={styles.hero}>
                    <h1>Find the best nightlife experience!</h1>
                    <Search fullForm={true} />
                </div>
            </div>
        </Main>
        <Footer />
    </div>
);


export default Home;
