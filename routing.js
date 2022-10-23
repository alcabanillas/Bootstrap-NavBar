(function () {
  var history = "";

  // This is a function that takes a page path as an argument
  // You need to make the function load the content of that page into the "content" div on the index file
  async function loadPage(page) {
    console.log(page)
    // fetch the page, use await
    const res = await fetch(page);
    // get text from res, use await
    const content = await res.text();
    // get the element with id 'content'
    const element = document.getElementById('content');
    // set innerHTML of the element
    // your code goes here
    element.innerHTML = content;
  }

  var routes = {
    "": "home.html",
    "/": "home.html",
    "#/home": "home.html",
    "#/about": "about.html",
    "#/mission": "mission.html",
    "#/signin": "signin.html",
  };

  function router() {
    var link = window.location.hash;
    var innerElement = "";

    // ----------------------------------------
    // If more than one parameter in the link,
    // I am targeting an element in the page,
    // an anchor. First load page, the scroll
    // the element into view.
    // ----------------------------------------

    var count = link.split("/").length - 1;
    if (count > 1) {
      // anchor element
      innerElement = link.split("/")[2];

      // page to load
      link = "#/" + link.split("/")[1];
    }

    // ----------------------------------------
    // Remember loaded page - used to avoid
    // page reload on internal linking
    // ----------------------------------------
    if (history === link && innerElement) {
      scrollIntoView(innerElement);
      history = link;
      return;
    }
    history = link;

    // get path (route) for page
    var route = routes[link];

    // if route exists, load page
    if (route) {
      loadPage(route, innerElement);
    }

    setActiveItem(link);
  }

  function setActiveItem(link) {
    if (link) {
      let el = document.getElementsByClassName('nav-link');
      for (let i = 0; i < el.length; i++){
        item = el[i];
        if (item.hash === link) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    }
    else {
      document.getElementsByClassName('navbar-brand')[0].classList.add('active');
    }
  }

  window.addEventListener('hashchange', router)

  // call the urlLocationHandler to load the page
  router();
})();