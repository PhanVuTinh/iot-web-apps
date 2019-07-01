 // This is called with the results from from FB.getLoginStatus().
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
     
    //   testAPI();
      showElement();
      callBtnShare()
    
    } else {
      // The person is not logged into your app or we are unable to tell.
       hideElement();
    //   callBtnLogin()
    callBtnLogin()
     
        
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '552228178441780',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}
function callBtnShare(){
    console.log('callBtnShare')
    // change url share here
    var urlshare = 'http://google.com';
    FB.ui({
    method: 'share',
    display: 'popup',
    href: urlshare,
    hashtag: '#sharegraphapi',
        quote: 'helo quote here'
    }, function(response){
        console.log('handle response share');
        console.log(JSON.stringify(response));
    });
}   
function callBtnLogout(){
  
    FB.logout(function(response) {
    // user is now logged out
    console.log('callBtnLogout')
    console.log(JSON.stringify(response));
    window.location.reload();
      
    });
}
function callBtnLogin() {
    FB.login(function(response) {
        // handle the response
        window.location.reload();
        console.log('call login')
        console.log(JSON.stringify(response));
        }, {scope: 'public_profile,email'});
}
function showElement(){
    document.getElementById('divBtnLogin').style.display= "none";
    document.getElementById('BtnLogin').style.display="none";
    document.getElementById('divBtnShare').style.display= "block";
    document.getElementById('divBtnLogout').style.display= "block";

}

function hideElement(){
   
    document.getElementById('divBtnLogin').style.display="none";
    document.getElementById('BtnLogin').style.display="block";
    document.getElementById('status').innerHTML = 'Đăng nhập facebook' + ' để chia sẽ.';
}