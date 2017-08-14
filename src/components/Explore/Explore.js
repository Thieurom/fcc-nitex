import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import search from '../../search';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Venue from '../Venue/Venue';
import styles from './Explore.css';


class Explore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: queryString.parse(this.props.location.search).location || '',
            results: []
        };

        this.explore = this.explore.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
    }

    explore(query) {
        if (query) {
            search.for(query)
                  .then(results => {
                      this.setState({ results });
                  });
        }
    }

    updateQuery(query) {
        this.props.history.push(`/explore?location=${query}`);
    }

    componentDidMount() {
        this.explore(this.state.query);
    }

    componentWillReceiveProps(nextProps) {
        const nextQuery = queryString.parse(nextProps.location.search).location || '';

        this.setState((prevState, props) => {
            return { query: nextQuery, results: [] };
        }, this.explore(nextQuery));
    }

    render() {
        const venues = this.state.results.map(item =>
            <Venue key={item.id} data={item} />
        );

        return (
            <div>
                <Header onExplore={true} exploreItem={this.state.query} handleSearch={this.updateQuery} />
                <Main>
                    <div className={styles.explore}>
                        {venues}
                    </div>
                </Main>
                <Footer />
            </div>
        );
    }
};

Explore.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}


const ExploreWithRouter = withRouter(Explore);


export default ExploreWithRouter;
