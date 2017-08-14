import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.css';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: props.query
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.searchField.blur();
        this.props.onSubmit(this.state.query);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ query: nextProps.query });
    }

    render() {
        return (
            <form method='GET' action='/explore' onSubmit={this.handleSubmit} >
                <input
                    className={this.props.fullForm ? styles.textFieldLarge : styles.textField}
                    type='text'
                    placeholder='Where you at'
                    name='location'
                    value={this.state.query}
                    ref={input => { this.searchField = input; }}
                    onChange={this.onChange} />

                {this.props.fullForm && (
                     <input className={styles.submit} type='submit' value='Search' />
                )}
            </form>
        );
    }
}


Search.propTypes = {
    fullForm: PropTypes.bool,
    query: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};


Search.defaultProps = {
    fullForm: false,
    query: ''
};


export default Search;
