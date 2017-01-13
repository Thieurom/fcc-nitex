'use strict'

(function () {
  var form = document.querySelector('.form');

  form.addEventListener('submit', function (e) {
    if (!form.location.value) {
      return e.preventDefault();
    }

    if (window.location.pathname === '/explore') {
      e.preventDefault();

      var query = form.location.value;
      var encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');

      // Clear the current content
      document.querySelector('.card-wrapper').textContent = '';

      // Load new content to DOM
      loadSearchResult(encodedQuery);

      // Update history
      window.history.pushState('', query, '?location=' + encodedQuery);

      // Remove focus from search box
      form.location.blur();
    }
  });


  function loadSearchResult(query) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var results = JSON.parse(xhr.responseText);

        results.forEach(function (result) {
          var card = createCardComponent(result);
          document.querySelector('.card-wrapper').appendChild(card);
        });
      }
    }

    xhr.open('GET', '/explore?location=' + query, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null);
  }


  function createCardComponent(data) {
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
    cardAction.textContent = 'Attendees';
    cardContent.appendChild(cardAction);

    card.appendChild(cardFigure);
    card.appendChild(cardContent);

    return card;
  }
})();