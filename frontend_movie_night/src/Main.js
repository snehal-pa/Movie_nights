const CLIENT_ID = "58233015853-ebr03ggbna9ohtlisggmftjsqpnsnsf0.apps.googleusercontent.com";
let auth2;

function start() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar.events"
    });
  });
}

$('#signinButton').click(function() {
  auth2.grantOfflineAccess().then(signInCallback);
  console.log('Clicked')
});

async function signInCallback(authResult) {
  console.log('authResult', authResult);

  if (authResult['code']) {

    // Hide the sign-in button now that the user is authorized
    $('#signinButton').hide();

    // Send the code to the server
    let result = await fetch('/storeauthcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: authResult['code']
    });
    // etc...
  } else {
    // There was an error.
  }
}