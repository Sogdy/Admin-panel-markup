"use strict";

// Remove user script begin
$(document).ready(function() {
    $("#members").on('click', function(e) { // event on click in members area
        var clicked = e.target;
        if($(clicked).hasClass("remove__button")) {
            var parent = $(clicked).closest(".section-table__row");
            var name = $(parent).find(".members__name").text();
            $("body").addClass("modal");
            $(".delete__content").html("Are you sure you want to remove " + name + " from this group?");
            $(".delete").on('click', function(event) { // event on click  in modal window
                var modal_clicked = event.target;
                if($(modal_clicked).hasClass("close")) {
                    $("body").removeClass("modal");
                    parent = '';
                }
                else if ($(modal_clicked).hasClass("delete__buttons_remove")) { 
                    $(parent).remove();
                    $("body").removeClass("modal");
                }
            }); 
        }
    });
// Remove user script end

// Email validation function begin
    function emailValidation(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
// Email validation function end    

// Email field handler begin
    $("#invite-members__button").on('click', function() {
        var input = $("#email_invitation").val().split(/[(,;|  )]+/);
        var validFlag = true;
        for(var i = 0; i<input.length; i++) {
            if(!emailValidation(input[i])) {
                validFlag = false;
            }
        }
        if(!validFlag) {
            $("#email_invitation").addClass("alert");
            $(".fa-exclamation-circle").css('display', 'block');
            $("#email_invitation").on('focus', function() {
                $("#email_invitation").removeClass("alert");
                $(".fa-exclamation-circle").css('display', 'none');
            });
        }
        else {
            $("#email_invitation").val("");
        }
    });
// Email field handler end
});
