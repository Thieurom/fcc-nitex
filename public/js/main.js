(function () {
  'use strict'

  var checkBtnClickHandler = (function () {

    var isRequesting;
    var lastRequest;
    var request;

    var sendRequest = function (venueId) {
      if (!isRequesting) {
        if (lastRequest === undefined || lastRequest !== request) {
          isRequesting = true;

          checkVenue(venueId, request, function () {
            isRequesting = false;
            lastRequest = request;

            sendRequest(venueId);
          });
        }
      }
    }

    return function (e) {
      var modal = document.querySelector('.modal');

      if (modal.classList.contains('login')) {
        // User didn't login
        // Display login modal
        modal.classList.add('show');

      } else {
        // User logged in
        var attendees;
        var target = e.target;
        var cardEl = this.parentNode;
        var link = cardEl.querySelector('a');
        var venueId = link.href.substr(link.href.lastIndexOf('/') + 1);

        // Attend to the selected venue
        if (this.classList.contains('button--check')) {
          attendees = parseInt(this.textContent.split(' ')[0]) - 1;
          this.classList.remove('button--check');
          request = false;

          // Remove from attendence list
        } else {
          attendees = parseInt(this.textContent.split(' ')[0]) + 1;
          this.classList.add('button--check');
          request = true;
        }

        // Display updated attendees number
        this.textContent = attendees + ' Attendee' + (attendees > 1 ? 's' : '')

        sendRequest(venueId);
      }
    }
  })();


  // Search venues
  var lastQuery = '';
  var form = document.querySelector('.form');

  // Handle searching
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.location.value) {
        return e.preventDefault();
      }

      if (window.location.pathname === '/explore') {
        e.preventDefault();

        var query = form.location.value;

        if (query !== lastQuery) {
          var encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');

          // Load new content to DOM
          loadSearchResult(encodedQuery);

          // Update history
          window.history.pushState('', query, '?location=' + encodedQuery);

          // Remove focus from search box
          form.location.blur();

          // Save the query
          lastQuery = query;
        }
      }
    });
  }


  // Handle back/forward on history
  window.onpopstate = function () {
    var url = window.location.href;
    var encodedQuery = url.substr(url.indexOf('location') + 9);
    var query = encodedQuery.replace(/\+/g, ' ');

    // Put the query on the search box
    form.location.value = query;

    // Load respective content into DOM
    loadSearchResult(encodedQuery);
  }


  // Handle clicking to attend/out
  setupCheckButtons();


  // Handle login/logout
  var navBtn = document.querySelector('.nav__item');
  var modalPanels = document.querySelectorAll('.modal');

  navBtn.addEventListener('click', function () {
    var modalName = navBtn.getAttribute('data-modal');
    var modal = document.querySelector('.modal.' + modalName);

    if (!modal.classList.contains('show')) {
      modal.classList.add('show');
    }
  });


  [].slice.call(modalPanels).forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      var target = e.target;

      e.stopPropagation();

      if (target.classList.contains('show')) {
        target.classList.remove('show');
      }
    });
  });


  //=====================================//
  // Miscs
  function setupCheckButtons() {
    var checkBtns = document.getElementsByClassName('button--small');

    if (checkBtns.length > 0) {
      [].slice.call(checkBtns).forEach(function (btn) {
        btn.addEventListener('click', checkBtnClickHandler);
      });
    }
  }


  // Search on user's query and load result into DOM
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

          setupCheckButtons();
        }
      }
    }

    xhr.open('GET', '/explore?location=' + encodedQuery, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(null);
  }


  function checkVenue(venueId, willAttend, done) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        done();
      }
    }

    xhr.open('PUT', '/venue/' + venueId, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (willAttend) {
      xhr.send('attend=yes');
    } else {
      xhr.send(null);
    }
  }


  // Create component store individual search result
  function createContentCard(data) {
    var card;

    var cardFigure,
      cardContent,
      cardTitle,
      cardSubheading,
      cardHeading,
      cardAction;

    var title,
      link;

    card = document.createElement('div');
    card.className = 'card';

    cardFigure = document.createElement('div');
    cardFigure.className = 'card__figure';
    cardFigure.setAttribute('data-image', data.photo);
    cardFigure.style.backgroundImage = 'url("' + data.photo + '")';

    cardContent = document.createElement('div');
    cardContent.className = 'card__content';

    cardTitle = document.createElement('div');
    title = document.createElement('h2');
    link = document.createElement('a');
    cardTitle.className = 'card__title';
    link.href = '/v/' + data.id;
    link.textContent = data.name;
    title.appendChild(link);
    cardTitle.appendChild(title);
    cardContent.appendChild(cardTitle);

    cardSubheading = document.createElement('p');
    cardSubheading.className = 'card__subheading';
    cardSubheading.textContent = data.address;
    cardContent.appendChild(cardSubheading);

    cardHeading = document.createElement('p');
    cardHeading.className = 'card__heading';
    cardHeading.textContent = data.tips;
    cardContent.appendChild(cardHeading);

    cardAction = document.createElement('button');
    cardAction.type = 'button';
    cardAction.className = 'button button--small';
    if (data.userAttendance) {
      cardAction.className += ' button--check';
    }
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