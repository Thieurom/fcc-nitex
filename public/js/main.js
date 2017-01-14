(function () {
  'use strict'

  var form = document.querySelector('.form');

  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.location.value) {
        return e.preventDefault();
      }

      if (window.location.pathname === '/explore') {
        e.preventDefault();

        var query = form.location.value;
        var encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');

        // Load new content to DOM
        loadSearchResult(encodedQuery);

        // Update history
        window.history.pushState('', query, '?location=' + encodedQuery);

        // Remove focus from search box
        form.location.blur();
      }
    });
  }


  // Handle back/forward on history
  window.onpopstate = function () {
    var url = window.location.href;
    var encodedQuery = url.substr(ulr.indexOf('location') + 9);
    var query = encodedQuery.replace(/\+/g, ' ');

    // Put the query on the search box
    form.location.value = query;

    // Load respective content into DOM
    loadSearchResult(encodedQuery);
  }


  function loadSearchResult(encodedQuery) {
    var xhr = new XMLHttpRequest();

    // Clear the current content
    document.querySelector('.card-wrapper').textContent = '';

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var results = JSON.parse(xhr.responseText);

        if (results.length === 0) {
          var card = createErrorCard(encodedQuery.replace(/\+/g, ' '));
          document.querySelector('.card-wrapper').appendChild(card);
        } else {
          results.forEach(function (result) {
            var card = createContentCard(result);
            document.querySelector('.card-wrapper').appendChild(card);
          });
        }
      }
    }

    xhr.open('GET', '/explore?location=' + encodedQuery, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null);
  }


  function createContentCard(data) {
    var card = document.createElement('div');
    card.className = 'card';

    var cardFigure = document.createElement('div');
    cardFigure.className = 'card__figure';
    cardFigure.setAttribute('data-image', data.photo);
    cardFigure.style.backgroundImage = 'url("' + data.photo + '")';

    var cardContent = document.createElement('div');
    cardContent.className = 'card__content';

    var cardTitle = document.createElement('div');
    var title = document.createElement('h2');
    var link = document.createElement('a');
    cardTitle.className = 'card__title';
    link.href = '/v/' + data.id;
    link.textContent = data.name;
    title.appendChild(link);
    cardTitle.appendChild(title);
    cardContent.appendChild(cardTitle);

    var cardSubheading = document.createElement('p');
    cardSubheading.className = 'card__subheading';
    cardSubheading.textContent = data.address;
    cardContent.appendChild(cardSubheading);

    var cardHeading = document.createElement('p');
    cardHeading.className = 'card__heading';
    cardHeading.textContent = data.tips;
    cardContent.appendChild(cardHeading);

    var cardAction = document.createElement('button');
    cardAction.type = 'button';
    cardAction.className = 'button button--small';
    cardAction.textContent = data.attendees + ' Attendee' + (data.attendees > 1 ? 's' : '');
    cardContent.appendChild(cardAction);

    card.appendChild(cardFigure);
    card.appendChild(cardContent);

    return card;
  }


  function createErrorCard(query) {
    var card = document.createElement('div');
    var title = document.createElement('h4');

    card.className = 'card card--nocontent';
    title.textContent = 'Sorry! We couldn\'t find any venue near \'' + query + '\'.';

    card.appendChild(title);

    return card;
  }
})();