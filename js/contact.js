'use strict';
$(function(){
    
    $('#form_message').on('submit', function(e){

        e.preventDefault();

        const mail = $("#mail").val();
        const subject = $("#subject").val();
        const message = $("#message").val();
        const captchaG = grecaptcha.getResponse();

        $.ajax({
            type: $("#form_message").attr('method'),
            url: $("#form_message").attr('action'),
            dataType: 'json',
            data: {
                mail: mail,
                subject: subject,
                message: message,
                captchaG: captchaG
            },
            success: function(response) {
                
                console.log(response);

                $("label").removeClass();
                
                const lab1 = $("label:eq(0)");
                const lab2 = $("label:eq(1)");
                const lab3 = $("label:eq(2)");
                const lab4 = $("label:eq(3)");

                const resPlace = $("#resultPlace");
                resPlace.hide();

                lab1.html('Twój e-mail:');
                lab2.html('Temat wiadomości:');
                lab3.html('Treść wiadomości:');
                lab4.html('');

                if('success' in response) {

                    resPlace.removeClass();
                    resPlace.addClass('alert alert-success');

                    $("#mail").val('');
                    $("#subject").val('');
                    $("#message").val('');

                    resPlace.html(response.success).fadeIn(500).delay(4000).fadeOut(500);

                } else {
                    if('mail' in response) {
                        lab1.hide().addClass('alert alert-danger').fadeIn(500).html(response.mail);
                    }
                    if('subject' in response) {
                        lab2.hide().addClass('alert alert-danger').fadeIn(500).html(response.subject);
                    }
                    if('content' in response) {
                        lab3.hide().addClass('alert alert-danger').fadeIn(500).html(response.content);
                    }
                    if('captcha' in response) {
                        lab4.hide().addClass('alert alert-danger').fadeIn(500).html(response.captcha);
                    }
                }

            }
        });

    });
    
});