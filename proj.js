var score = 0;
$(document).ready(function () {

    setInterval(function () {
        // Randam function for bone and poison
        var rand = Math.floor((Math.random() * 5) + 1);
        if (rand <= 3) {
            var height = Math.floor((Math.random() * 2) + 1);//random function for different heights of poison
            var x;
            if (height == 1) {
                x = 94;
            }
            if (height == 2) {
                x = 55;
            }
            $('#poisons')
                .append(
                    $("<div class='poison'>")
                        .css({ top: x + "%", left: "100%" })
                        .animate(
                            { left: '25%', top: x + "%" }, 4000, 'linear', function () { $(this).remove(); }//poison is removed
                        )
                )
        }
        if (rand == 4 || rand ==5) {
            var height = Math.floor((Math.random() * 2) + 1);//random function for different heights of bone
            var x;
            if (height == 1) {
                x = 65;
            }
            if (height == 2) {
                x = 45;
            }
            $('#bones')
                .append(
                    $("<div class='bone'>")
                        .css({ top: x + "%", left: "100%" })
                        .animate(
                            { left: '25%', top: x + "%" }, 4000, 'linear', function () { $(this).remove(); }//bone is removed
                        )
                )
        }
    }, 1000)

    //keys for playing game
    jump = true;
    $(document).keypress(function (e) {
        if (jump && e.key === "a") {     //"a" for short jump
            jump = false;
            $('#dog')
                .animate({ "top": "430px" }, 700)
                .animate({ "top": "76%" }, 700, function () {
                    jump = true;
                })
        }
        if (jump && e.key === "d") {     //"d" for long jump
            jump = false;
            $('#dog')
                .animate({ "top": "260px" }, 550)
                .animate({ "top": "76%" }, 550, function () {
                    jump = true;
                })
        }
    });

    //colliding conditions for dog with poison and bone
    setInterval(function () {
        var dog = $('#dog')
        var dogPos = dog.position();
        var dogLeft = dogPos.left;
        var dogRight = dogLeft + dog.width();
        var dogTop = dogPos.top;
        var dogBottom = dogTop + dog.height();
        $('.poison').each(              //dog with poison
            function () {
                var poison = $(this)
                var poisonPos = poison.position();
                var poisonX = poisonPos.left + poison.width() / 2;
                var poisonY = poisonPos.top + poison.height() / 2;
                if (dogRight > poisonX && dogLeft < poisonX && dogTop < poisonY && dogBottom > poisonY) {
                    dog.css("left", dogLeft - 100 + "px");
                    poison.remove();
                    $('audio#drink')[0].play();
                }
            }
        )
        $('.bone').each(                //dog with bone
            function () {
                var bone = $(this)
                var bonePos = bone.position();
                var boneX = bonePos.left + bone.width() / 2;
                var boneY = bonePos.top + bone.height() / 2;
                if (dogRight > boneX && dogLeft < boneX && dogTop < boneY && dogBottom > boneY) {
                    dog.css("left", dogLeft + 100 + "px");
                    bone.remove();
                    $('audio#eat')[0].play();
                    score += 1;
                }
            }
        )
    }, 800);

    //colliding condition for lion and dog
    setInterval(function () {
        var lion = $('#lion')
        var lionPos = lion.position();
        $('#dog').each(
            function () {
                var dog = $(this)
                var dogPos = dog.position();
                var dogX = (0.75) * (dogPos.left + dog.width() / 2);
                var dogY = dogPos.top + dog.height() / 2;
                var lionLeft = lionPos.left;
                var lionRight = lionLeft + lion.width();
                var lionTop = lionPos.top;
                var lionBottom = lionTop + lion.height();
                if (lionRight > dogX && lionLeft < dogX && lionTop < dogY && lionBottom > dogY) {
                    document.location.href="end page.html";     //linking end page
                }
            }
        )
    }, 800);

    //background audio
    setInterval(function(){
        $('audio#jungle')[0].play();
    })
    setInterval(function(){
        $('audio#Tiger')[0].play();
    },5000)

});
