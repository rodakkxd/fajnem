var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })
});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

imageInput.addEventListener('change', (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected")

    var file = imageInput.files[0];
    var data = new FormData();
    data.append("image", file);

    fetch("https://api.imgur.com/3/image/" ,{
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID c27369172c61327'
        },
        body: data
    })
    .then(result => result.json())
    .then(response => {
        var url = response.data.link;
        upload.classList.remove("error_shown")
        upload.setAttribute("selected", url);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = url;
    })
});

// Load existing data
var params = new URLSearchParams(window.location.search);
if(params.has("name")) {
    var eName = document.getElementById("name");
    eName.value = params.get("name");
    eName.parentElement.classList.add("filled");
}
if(params.has("surname")) {
    var eSurname = document.getElementById("surname");
    eSurname.value = params.get("surname");
    eSurname.parentElement.classList.add("filled");
}
if(params.has("nationality")) {
    var eNationality = document.getElementById("nationality");
    eNationality.value = params.get("nationality");
    eNationality.parentElement.classList.add("filled");
}
if(params.has("birthday")) {
    var eBirthday = document.getElementById("birthday");
    eBirthday.value = params.get("birthday");
    eBirthday.parentElement.classList.add("filled");
}
if(params.has("pesel")) {
    var ePesel = document.getElementById("pesel");
    ePesel.value = params.get("pesel");
    ePesel.parentElement.classList.add("filled");
}
if(params.has("image")) {
    upload.setAttribute("selected", params.get("image"));
    upload.classList.add("upload_loaded");
    upload.querySelector(".upload_uploaded").src = params.get("image");
}

document.querySelectorAll(".input").forEach((input) => {
    input.addEventListener("input", () => {
        if(input.value.trim() !== "") {
            input.parentElement.classList.add("filled");
        } else {
            input.parentElement.classList.remove("filled");
        }
    });
});

document.querySelector(".edit-go").addEventListener('click', () => {
    var empty = [];

    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }else{
        params.set("image", upload.getAttribute("selected"))
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }
    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{
        location.href = `card.html?` + params.toString();
    }
});

document.querySelector(".cancel-go").addEventListener('click', () => {
    location.href = `card.html?` + params.toString();
});

function isEmpty(value){
    let pattern = /^\s*$/
    return pattern.test(value);
}
