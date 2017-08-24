$("#logOrReg").on("click", evt => {
    evt.preventDefault();
    $("#loginModal").modal();
});

$("#login").on("click", evt => {
    evt.preventDefault();
    let redirectUrl = window.location.href;
    $.post("/login", $("#login-form").serialize(), data =>{
        if(data != "failed") {
            window.location.href = redirectUrl;
        } else {
            $("#logFail").text("Incorrect username and/or password.");
        }
    });
});

$("#register").on("click", evt => {
    evt.preventDefault();
    let redirectUrl = window.location.href;
    if($('#password-register').val().length < 6) {
        $("#regFail").text("Password must be at least 6 characters long.");
    } else {
        $.post("/signup", $("#register-form").serialize(), data =>{
            if(data != "failed") {
                window.location.href = redirectUrl;
            } else {
                $("#regFail").text("Sorry, that username is taken.");
            }
        });
    }
});
