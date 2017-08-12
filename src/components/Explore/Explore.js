import React, { Component } from 'react';
import queryString from 'query-string';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import styles from './Explore.css';


class Explore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: queryString.parse(props.location.search).location || ''
        };
    }

    render() {
        return (
            <div>
                <Header onExplore={true} />
                <Main>
                    <div className={styles.explore}>
                    </div>
                </Main>
                <Footer />
            </div>
        );
    }
};


export default Explore;
