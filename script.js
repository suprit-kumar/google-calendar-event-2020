$(document).ready(function(){

    // Call createMeeting function on create meeting button click
    $('#create_meeting_btn').click(function(){
        createMeeting();
    })
});

// create or update meeting in google calendar

function createMeeting(){
    const title = $('#title').val();
    const date = $('#date').val();
    const startTime = $('#start_time').val();
    const endTime = $('#end_time').val();
    const email = $('#email').val();
    const location = $('#location').val();
    const emailadd = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  // Email Validation regex
    // Covert String date and time to datetime
    const startDateTime = new Date(date+' '+startTime);
    const endDateTime = new Date(date+' '+endTime);
    // const diff = (endDateTime.getTime() - startDateTime.getTime()) / 1000 / 60;
    

    if(!title){
        swal('Enter Title');
        return false;
    }else if(!date){
        swal('Enter Date');
        return false;
    }
    else if(!startTime){
        swal('Enter Start Time');
        return false;
    }
    else if(!endTime){
        swal('Enter End Time');
        return false;
    }
    else if(!(endDateTime > startDateTime)){
        swal('End Time should be greater than start time');
        return false;
    }
    else if(!email){
        swal('Enter Email');
        return false;
    }
    else if(!(emailadd.test(email))){
        swal('Enter Valid Email Id');
        return false;
    }
    else if(!location){
        swal('Enter Location');
        return false;
    }else{

    }

}