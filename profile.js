$(document).ready(function(){

    $('#viewProfile > span').addClass('profile__active');

    $('#editProfile').click(function(){
        // 1 remove active from view profile
        $("#editProfile > span").addClass('profile__active');
        // 2 add active to  edit profile
        $("#viewProfile > span").removeClass('profile__active');

        // 3 show remove view profile page 


        // 4 show edit profile page



    })


    $('#viewProfile').click(function(){
        // 1 remove active from edit profile
        $("#editProfile > span").removeClass('profile__active');
        // 2 add active to view  profile
        $("#viewProfile > span").addClass('profile__active');

        // 3 show remove view profile page 


        // 4 show edit profile page



    })
})