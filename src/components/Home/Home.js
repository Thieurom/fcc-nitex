import React from 'react';
import styles from './Home.css';
import Search from '../Search/Search';


const Home = () => (
    <div className={styles.home}>
        <div className={styles.hero}>
            <h1>Find the best nightlife experience!</h1>
            <Search />
        </div>
    </div>
);


export default Home;
