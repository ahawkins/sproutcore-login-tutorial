LoginTutorial.statechart = SC.Statechart.create({
  rootState: SC.State.design({
    initialSubstate: 'loggedOut',

    loggedOut: SC.State.design({
      enterState: function() {
        LoginTutorial.getPath('loginPage.mainPane').append();
      },

      exitState: function() {
        LoginTutorial.getPath('loginPage.mainPane').remove();
      },

      authenticate: function() {
        var userName = LoginTutorial.getPath('loginController.userName');
        var password = LoginTutorial.getPath('loginController.password');

        SC.Request.postUrl('/login', {user_name: userName, password: password}).
          notify(this, 'didCompleteAuthentication').json().send();
      },

      didCompleteAuthentication: function(response){
        if(SC.ok(response)) {
           this.gotoState('loggedIn');
         } else {
           SC.AlertPane.error("Login information incorrect!");
         } 
      }
    }),

    loggedIn: SC.State.design({
      enterState: function() {
        LoginTutorial.getPath('mainPage.mainPane').append();
      }
    })
  })
});
