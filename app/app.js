// Our Main App
App = function(el) {
    this.$el = $(el);
    this.$register = $('#register');
    this.$login = $('#login');

    $('#paws form').on('submit', this.submit.bind(this));

}

App.prototype.init = function() {
    this.registerShow();
}

App.prototype.registerShow = function() {

    this.$login.hide();
    this.$register.show();

    var $loginButton = $('#register .showLogin').on('click', this.loginShow.bind(this));
    var $registerButton = $('#login .showRegister').on('click', this.registerShow.bind(this));

}

App.prototype.loginShow = function() {
    this.$login.show();
    this.$register.hide();
}


App.prototype.submit = function(event) {
    var $form = $(event.currentTarget);
    var endpoint = $form.data('endpoint');
    var serialized = $form.serializeArray();

    var credentials = {
        username: serialized[0].value,
        password: serialized[1].value
    }

    // (endpoint === 'register' ? this.registerSubmit.bind(this) : this.loginSubmit.bind(this))(credentials);
    if (endpoint === 'register') {
        this.register(credentials)
    } else if (endpoint === 'login') {
        this.login(credentials);
    }
    return false;
}

App.prototype.register = function(credentials) {
    var promise = firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password);
}

App.prototype.login = function(credentials) {
    var promise = firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password);
}


document.addEventListener('DOMContentLoaded', function () {

    // Init the Map
    var app = new App('#paws');
    app.init();
    
});