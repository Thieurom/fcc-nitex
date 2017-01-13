'use strict'

const request = require('request');
const queryString = require('query-string');


const FS_API_ID = process.env.FOURSQUARE_API_ID;
const FS_API_SECRET = process.env.FOURSQUARE_API_SECRET;
const FS_API_URL = 'https://api.foursquare.com/v2/venues/explore';
const FS_CATEGORY = '4bf58dd8d48988d116941735';
const FS_API_DATE = 20161016;

module.exports = function (query, done) {
  var parameter = {
    v: FS_API_DATE,
    client_id: FS_API_ID,
    client_secret: FS_API_SECRET,
    categoryId: FS_CATEGORY,
    venuePhotos: 1,
    limit: 10,
    near: query
  };

  var queryUrl = FS_API_URL + '?' + queryString.stringify(parameter);

  request(queryUrl, (err, response, body) => {
    if (err) {
      done(err);
    } else if (response.statusCode === 200) {
      done(null, parseResponse(body));
    }
  });
}


// Helpers
function parseResponse(data) {
  var rawData = JSON.parse(data);
  var items;

  if (rawData.meta.code !== 200) {
    return { 'error': 'Error when accessing API' };
  }

  items = rawData.response.groups[0].items;

  return items.map(function (item) {
    return {
      id: item.venue.id,
      name: item.venue.name,
      address: item.venue.location.address + ', ' + item.venue.location.city + ', ' + item.venue.location.state,
      photo: item.venue.photos.groups[0].items[0].prefix + 'original' + item.venue.photos.groups[0].items[0].suffix,
      tips: item.tips[0].text
    };
  });
}