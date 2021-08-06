//Social hover efx

const socialIcons = document.querySelectorAll('footer .social ul li');


const socialPath = document.querySelectorAll('footer .social path');

for (var i = 0; i < socialIcons.length; i++) {
    let count = i;

    socialIcons[count].onmouseenter = function () {
        socialPath[count].classList.add("fill");
    };

    socialIcons[count].onmouseleave = function () {
        socialPath[count].classList.remove("fill");
    };
};






//EVERYTHING Below is what makes the url shortening work

//Custom Error Message
const form = document.querySelector('.advanced_shorten form')

form.addEventListener("invalid", function (event) {
    event.preventDefault();
}, true);

// Support Safari, iOS Safari, and the Android browser—each of which do not prevent form submissions by default
form.addEventListener("submit", function (event) {
    if (!this.checkValidity()) {
        event.preventDefault();
    }
});

var submitButton = form.querySelector("input[type=submit]");
submitButton.addEventListener("click", function (event) {
    var invalidFields = form.querySelectorAll(":invalid"),
        errorMessages = form.querySelectorAll(".error-message"),
        parent;

    var shortenGrid = document.querySelector(".shorten .grid")
    var errorDiv = document.querySelector(".error")
    var shortenBtn = document.querySelector(".shorten #shortenit")
    // Remove any existing messages
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].parentNode.removeChild(errorMessages[i]);
    }

    for (var i = 0; i < invalidFields.length; i++) {
        parent = invalidFields[i].parentNode;
        errorDiv.classList.add("error-message");
        errorDiv.innerHTML = "Please add a link";

        invalidFields[i].style.color = "var(--secondary-red)";
        invalidFields[i].style.border = "1px solid var(--secondary-red)";
    }

    function myFunction(x) {
        if (x.matches) { // If media query matches
            shortenGrid.style.gridTemplateRows = "repeat(3, 1fr)"
            shortenGrid.style.gap = "0"
            shortenGrid.style.height = "150px"
            errorDiv.style.gridRow = "2"
            errorDiv.style.textAlign = "left"
            errorDiv.style.paddingLeft = "10px"
            shortenBtn.style.gridRow = "3"
        }
    }

    var x = window.matchMedia("(max-width: 375px)")
    myFunction(x) // Call listener function at run time


})

//Adding API connection
const shortenButton = document.getElementById('shortenit');
const Shortened = document.querySelector(".shortened");


var siteURL = ""

//Keeps previous shortened links on refresh
if (sessionStorage.length > 1) {
    for (i = 1; i < sessionStorage.length; i++) {
        let num = i
        let div = document.createElement("div")
        let insert = sessionStorage.getItem(num)

        div.innerHTML = insert

        Shortened.appendChild(div)
    }
}

//if button is clicked
shortenButton.addEventListener("click", function () {
    let check = form.checkValidity()
    let Website = document.getElementById('website').value;

    console.log(Website)

    if (!check || Website === "") {
        console.log("form not valid")

    } else {
        //for changing the button
        var shortBtn = document.querySelector(".shorten form .btn")
        shortBtn.style.backgroundColor = "var(--neutral-dark-vio)"
        shortBtn.value = "Shortening..."



        let div = document.createElement("div")

        siteURL = "https://api.shrtco.de/v2/shorten?url=" + Website + "/"

        var request = new XMLHttpRequest()

        for (i = 0; i < sessionStorage.length; i++) {
            let num = 0 + i
        }
        //shortens the link
        request.open('GET', siteURL)

        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response)

            var savedLink = '<div class="prev_short flex"><div class="url">' + Website + '</div><div class="short flex"><div class="short_url text_cyan">' + data.result.short_link + '</div><div class="btn_div"><button class="btn copy">Copy</button></div></div></div>'

            let count = sessionStorage.length

            for (i = count; i < count + 1; i++) {
                let num = i
                sessionStorage.setItem(i, savedLink)
            }

            var lastSesh = sessionStorage.getItem(1)

            div.innerHTML = savedLink
            for (i = 1; i < sessionStorage.length; i++) {
                let num = 0 + i
            }


            function firstFunction(_callback) {
                shortBtn.style.backgroundColor = "var(--primary-cyan)"
                shortBtn.value = "Shorten It!";
                location.reload()
            }

            function secondFunction() {
                firstFunction(function () {
                    Shortened.appendChild(div)
                })
            }

            secondFunction()
        }

        request.send();
    }
})


//if enter is pressed
const textField = document.getElementById("website")
textField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let check = form.checkValidity()
        let Website = document.getElementById('website').value;

        console.log(Website)

        if (!check || Website === "") {
            console.log("form not valid")

        } else {
            //for changing the button
            var shortBtn = document.querySelector(".shorten form .btn")
            shortBtn.style.backgroundColor = "var(--neutral-dark-vio)"
            shortBtn.value = "Shortening..."



            let div = document.createElement("div")

            siteURL = "https://api.shrtco.de/v2/shorten?url=" + Website + "/"

            var request = new XMLHttpRequest()

            for (i = 0; i < sessionStorage.length; i++) {
                let num = 0 + i
            }
            //shortens the link
            request.open('GET', siteURL)

            request.onload = function () {
                // Begin accessing JSON data here
                var data = JSON.parse(this.response)

                var savedLink = '<div class="prev_short flex"><div class="url">' + Website + '</div><div class="short flex"><div class="short_url text_cyan">' + data.result.short_link + '</div><div class="btn_div"><button class="btn copy">Copy</button></div></div></div>'

                let count = sessionStorage.length

                for (i = count; i < count + 1; i++) {
                    let num = i
                    sessionStorage.setItem(i, savedLink)
                }

                var lastSesh = sessionStorage.getItem(1)

                div.innerHTML = savedLink
                for (i = 1; i < sessionStorage.length; i++) {
                    let num = 0 + i
                }


                function firstFunction(_callback) {
                    shortBtn.style.backgroundColor = "var(--primary-cyan)"
                    shortBtn.value = "Shorten It!";
                    location.reload()
                }

                function secondFunction() {
                    firstFunction(function () {
                        Shortened.appendChild(div)
                    })
                }

                secondFunction()
            }

            request.send();
        }
    }
});


//Copy to clipboard
const copyButton = document.querySelectorAll(".copy")
const shortendUrl = document.querySelectorAll(".short_url")

for (i = 0; i < copyButton.length; i++) {
    let count = i
    copyButton[count].addEventListener("click", function () {
        var r = document.createRange();
        r.selectNode(shortendUrl[count]);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        for (j = 0; j < copyButton.length; j++) {
            let counter = j
            copyButton[counter].classList.remove("btn_dark")
            copyButton[counter].innerHTML = "Copy"
        }

        copyButton[count].classList.add("btn_dark")
        copyButton[count].innerHTML = "Copied!"
    })
}




//Mobile Navigation

const navButton = document.getElementById('mobile_nav_btn');
const closeButton = document.getElementById('mobile_close_btn');
const mobileNavigation = document.getElementById('mobile_navigation');
const hamburgerButton = document.querySelector('#mobile_nav_btn path');
const exButton = document.querySelector("#mobile_close_btn path")

closeButton.style.display = "none";

//add hover effect to icons
navButton.onmouseenter = function () {
    hamburgerButton.style.fill = "#232127";
};
navButton.onmouseleave = function () {
    hamburgerButton.style.fill = "#9e9aa7";
};
closeButton.onmouseenter = function () {
    exButton.style.fill = "#232127";
};
closeButton.onmouseleave = function () {
    exButton.style.fill = "#9e9aa7";
};


//add click function to show menu
navButton.addEventListener("click", function () {
    mobileNavigation.style.display = "flex";
    navButton.style.display = "none";
    closeButton.style.display = "flex";
});

//add click function to close menu
closeButton.addEventListener("click", function () {
    mobileNavigation.style.display = "none";
    navButton.style.display = "flex";
    closeButton.style.display = "none";
});