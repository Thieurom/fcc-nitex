import React from 'react';
import PropTypes from 'prop-types';
import styles from './Venue.css';


const Venue = ({ data }) => (
    <article className={styles.venue}>
        <div className={styles.figure} style={{ backgroundImage: `url(${data.photo})`}}></div>
        <div className={styles.content}>
            <div className={styles.name}>
                <h2><a href={`https://foursquare.com/v/${data.id}`}>{data.name}</a></h2>
            </div>
            <p className={styles.address}><i className='fa fa-map-marker'></i> {data.address}</p>
            <p className={styles.tips}>{data.tips}</p>
            <div className={styles.action}>
                <button className={styles.attend}>{data.attendees + ' Attendee'}</button>
            </div>
        </div>
    </article>
)


export default Venue;
