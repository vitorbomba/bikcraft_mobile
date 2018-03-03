// Dom7
var $$ = Dom7;
$$('.logoff').hide();
$$('.login-screen-open').show();

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});


// Inscrever-se
$$('#my-login-screen .Cadastrar').on('click', function () {
  var username = $$('#my-login-screen [name="email"]').val();
  var password = $$('#my-login-screen [name="senha"]').val();

//Alert username and password
//app.dialog.alert('Email: ' + username + '<br>Senha: ' + password);

firebase 
  .auth()
  .createUserWithEmailAndPassword(username,password)
  .then( function () {
    app.dialog.alert('Bem Vindo: ' + username);
    this.$$('.toolbar-inner').text('Bem Vindo ' + username);

  })
  .catch( function(error){
    console.error(error.code)
    console.error(error.message)
    if (error.code =='auth/invalid-email'){
      app.dialog.alert('E-mail inválido, por favor verifique')
    }
    app.dialog.alert('Falha ao cadastrar, verifique o erro no console');
  //  this.$$('.toolbar-inner').innerHtml = 'Bem Vindo ' + username;
  })

  // Close login screen
  app.loginScreen.close('#my-login-screen');

});

// Logar
$$('#my-login-screen .Logar').on('click', function () {
  var username = $$('#my-login-screen [name="email"]').val();
  var password = $$('#my-login-screen [name="senha"]').val();

//Alert username and password
//app.dialog.alert('Email: ' + username + '<br>Senha: ' + password);

firebase 
  .auth()
  .signInWithEmailAndPassword(username,password)
  .then( function () {
    app.dialog.alert('Bem Vindo: ' + username);
    this.$$('.toolbar-inner').text('Bem Vindo ' + username + 'Você está logado!');
    $$('.logoff').show();
    $$('.login-screen-open').hide();
    $$('input#email').val('');
    $$('input#senha').val('');
  })
  .catch( function(error){
    console.error(error.code)
    console.error(error.message)
    if (error.code =='user-not-found'){
      app.dialog.alert('Não há registro de usuário, correspondente a este odemtoficadpr. O usuário pode ter sido excluído.')
    }
    else if (error.code =='wrong-password'){
      app.dialog.alert('A senha é invalida ou o usuário não possui uma senha.')
    }
    app.dialog.alert('Falha ao logar, verifique o erro no console');
  })

  // Close login screen
  app.loginScreen.close('#my-login-screen');

});

// Logoff
$$('#my-login-screen .logoff').on('click', function () {
  app.loginScreen.close('#my-login-screen');
  $$('input#email').val('');
  $$('input#senha').val('');

firebase 
  .auth()
  .signOut()
  .then( function () {
    this.$$('.toolbar-inner').text('Usuario não autenticado');
    app.dialog.alert('Usuário não autenticado');
    app.loginScreen.close('#my-login-screen');    
    $$('.logoff').hide();
    $$('.login-screen-open').show();
  })
 
  // Close login screen
  app.loginScreen.close('#my-login-screen');

});

// botão fechar

$$('#my-login-screen .login-screen.close').on('click', function (){
  $$('input#email').val('');
  $$('input#senha').val('');
})
$$('.logoff').on('click', function (){
  this.$$('.toolbar-inner').text('Usuário não autenticado');
  app.dialog.alert('Usuário não autenticado');
  $$('input#email').val('');
  $$('input#senha').val('');
  $$('.logoff').hide();
  $$('.login-screen-open').show();
}, function(error){
  console.error(error)
})


  // Alert username and password
  //app.dialog.alert('Email: ' + username + '<br>Senha: ' + password);
