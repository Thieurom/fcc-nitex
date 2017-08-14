import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import styles from './Home.css';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToExplore: false
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(query) {
        if (query) {
            this.query = query;
            this.setState({ redirectToExplore: true });
        }
    }

    render() {
        if (this.state.redirectToExplore) {
            return (
                <Redirect push to={{
                    pathname: '/explore',
                    search: `?location=${this.query}`}} />
            );
        }

        return (
            <div>
                <Header />
                <Main>
                    <div className={styles.home}>
                        <div className={styles.hero}>
                            <h1>Find the best nightlife experience!</h1>
                            <Search fullForm={true} onSubmit={this.handleSearch} />
                        </div>
                    </div>
                </Main>
                <Footer />
            </div>
        );
    }
}

export default Home;
