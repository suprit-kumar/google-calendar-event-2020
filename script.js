$(document).ready(function () {
    handleClientLoad();
    // Call createMeeting function on create meeting button click
    $('#create_meeting_btn').click(function () {
        createMeeting();
    })
});

// create or update meeting in google calendar

function createMeeting() {
    const title = $('#title').val();
    const date = $('#date').val();
    const startTime = $('#start_time').val();
    const endTime = $('#end_time').val();
    const email = $('#email').val();
    const location = $('#location').val();
    const emailadd = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  // Email Validation regex
    // Covert String date and time to datetime
    const startDateTime = new Date(date + ' ' + startTime);
    const endDateTime = new Date(date + ' ' + endTime);
    // const diff = (endDateTime.getTime() - startDateTime.getTime()) / 1000 / 60;


    if (!title) {
        swal('Enter Title');
        return false;
    } else if (!date) {
        swal('Enter Date');
        return false;
    }
    else if (!startTime) {
        swal('Enter Start Time');
        return false;
    }
    else if (!endTime) {
        swal('Enter End Time');
        return false;
    }
    else if (!(endDateTime > startDateTime)) {
        swal('End Time should be greater than start time');
        return false;
    }
    else if (!email) {
        swal('Enter Email');
        return false;
    }
    else if (!(emailadd.test(email))) {
        swal('Enter Valid Email Id');
        return false;
    }
    else if (!location) {
        swal('Enter Location');
        return false;
    }
    else {
        var someRandomString = Math.random().toString(36).substring(2, 10);
        var eventCalendar = {
            'summary': title,
            'location': location,
            'description': 'My online meeting',
            'start': {
                'dateTime': date + 'T' + startTime + ':00+05:30',
                'timeZone': 'Asia/Calcutta'
            },
            'end': {
                'dateTime': date + 'T' + endTime + ':00+05:30',
                'timeZone': 'Asia/Calcutta'
            },
            "conferenceData": {
                "createRequest": {
                    "requestId": someRandomString,
                    "conferenceSolutionKey": {"type": "hangoutsMeet"}
                }
            },
            'attendees': [
                {'email': email}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': eventCalendar
        });

        request.execute(function (event) {
            console.log('event-->', event);
        });
    }

}


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '316734696300-1ul0nue9kut89o8n631mf3f1c77vkuj0.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyANJosyAR55JTX73jlUV28u55R3kWgUQ80';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";

    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {

        var authorizeButton = document.getElementById('authorize_button');
        var signoutButton = document.getElementById('signout_button');
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

function updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize_button');
    var signoutButton = document.getElementById('signout_button');

    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        // handleAuthClick();
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}