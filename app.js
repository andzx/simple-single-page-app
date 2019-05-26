/*-----------------------------------------------*/
/*                 App variables                 */
/*-----------------------------------------------*/
app = {}; // Holds any app global variables and functions
controllers = {}; // Holds all app controllers
controllers.pages = {}; // Holds all page controllers
controllers.partials = {}; // Holds all partial controllers
views = {}; // Holds all app views
views.pages = {}; // Holds all page views
views.partials = {}; // Holds all partial views

/*-----------------------------------------------*/
/*                 App page views                */
/*-----------------------------------------------*/
views.pages.index = '\
    <div class="container">\
        <header>Header</header>\
        <nav class="navigation">\
            <span class="link" data-location="index">Index</span>\
            <span class="link" data-location="about">About</span>\
            <span class="link" data-location="contact">Contact</span>\
        </nav>\
        <div class="content"></div>\
        <footer>&copy; Copyright notice</footer>\
    </div>';
views.pages.error404 = '\
    <h1>404, not found</h1>\
    <p>The content you\'re looking for could not be found.</p>';

/*-----------------------------------------------*/
/*               App partial views               */
/*-----------------------------------------------*/
views.partials.index = '\
    <p>Landing page content</p>';
views.partials.about = '\
    <p>About page content</p>';

views.partials.contact = '\
    <p>Contact page content</p>';

/*-----------------------------------------------*/
/*                App controllers                */
/*-----------------------------------------------*/
controllers.pages.index = function() {
    // Render the view
    app.render(".app", views.pages.index);
    app.render(".content", views.partials.index);
}
controllers.pages.about = function() {
    app.render(".app", views.pages.index);
    app.render(".content", views.partials.about);
}
controllers.pages.contact = function() {
    app.render(".app", views.pages.index);
    app.render(".content", views.partials.contact);
}
controllers.pages.error404 = function() {
    app.render(".app", views.pages.error404);
}

/*-----------------------------------------------*/
/*            App partial controllers            */
/*-----------------------------------------------*/
controllers.partials.navigation = function() {
    // Add navigation functionality
    var links = document.querySelectorAll(".link");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {
            app.navigate(this.dataset.location);
        });
    }
}

/*-----------------------------------------------*/
/*             App general functions             */
/*-----------------------------------------------*/

// App view rendering function
app.render = function(target, view) {
    var target = document.querySelector(target);
    target.innerHTML = "";
    target.insertAdjacentHTML('beforeend', view);
}
// App routing function
app.navigate = function(location, direction) {
    // Don't navigate if already there
    if (location == app.location) {
        return;
    }

    // Set app location
    app.location = location;
    
    // Check if location exists
    if (location === "/" || location === "" || location === undefined) {
        // Navigate to index
        controllers.pages["index"]();
        controllers.partials.navigation();
    } else if (controllers.pages[location]) {
        // Navigate to location
        controllers.pages[location]();
        controllers.partials.navigation();
    } else {
        // Display the 404 page
        controllers.pages.error404();
    }
    
    // Set url
    if (direction) {
        window.history.replaceState(null, null, location);
        return;
    }
    
    // Add new history location
    window.history.pushState(null, null, location);
}

/*-----------------------------------------------*/
/*              App initialization               */
/*-----------------------------------------------*/
// Set initial app location
app.location = null;

// Listen for app to load
window.addEventListener("load", function() {
    // Set initial page location
    window.history.replaceState(null, null, location);

    // Listen for page changes
    window.onpopstate = function(event) {
        // Get the requested location
        if(window.location.pathname != "/") {
            var location = window.location.pathname.substr(1);
        }

        // Navigate to the requested page
        app.navigate(location, true);
    };

    // Get the initial page that was requested
    var location = window.location.pathname.substr(1);

    // Navigate to the requested page
    app.navigate(location);
});
