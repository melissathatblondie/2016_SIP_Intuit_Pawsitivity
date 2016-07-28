// Main entry for app
App = function(el) {
    this.$el = $(el);
    this.$register = $('#register');
    this.$login = $('#login');

    $('#paws form').on('submit', this.submit.bind(this));

    $('#register .showLogin').on('click', this.loginShow.bind(this));
    $('#login .showRegister').on('click', this.registerShow.bind(this));

}

// Start the app
App.prototype.init = function() {
    this.registerShow();
}

// Show Registration
App.prototype.registerShow = function() {
    this.$login.hide();
    this.$register.show();
}

// Show Login
App.prototype.loginShow = function() {
    this.$login.show();
    this.$register.hide();
}

// Catch all form submits
App.prototype.submit = function(event) {
    var $form = $(event.currentTarget);
    var endpoint = $form.data('endpoint');
    var serialized = $form.serializeArray();

    var credentials = {
        username: serialized[0].value,
        password: serialized[1].value
    }


    if (endpoint === 'register') {
        this.register(credentials)
    } else if (endpoint === 'login') {
        this.login(credentials);
    }

    // (endpoint === 'register' ? this.registerSubmit.bind(this) : this.loginSubmit.bind(this))(credentials);
    return false;
}

// Firebase Register
App.prototype.register = function(credentials) {
    var promise = firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password);
    // promise.then( DO SOMETHING HERE )
    // promise.catch( DO SOMETHING HERE )
}

// Firebase login
App.prototype.login = function(credentials) {
    var promise = firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password);
}


// When the DOM is ready bootstrap the app
document.addEventListener('DOMContentLoaded', function () {

    var app = new App('#paws');
    app.init();
    
});