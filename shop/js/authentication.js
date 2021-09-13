document.addEventListener("DOMContentLoaded", addListeners);

function addListeners(){
    const loginForm = document.querySelector(".login-form");
    const signUpForm = document.querySelector(".sign-up");

    if(loginForm){
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            loginAPI(loginForm);
        })
    }

    if(signUpForm){
        signUpForm.addEventListener('submit', e => {
            e.preventDefault();
            signUpAPI(signUpForm);
        });
        signUpForm.querySelectorAll("#username").forEach( input => {
            input.addEventListener("blur", () => {
                if(input.value.length > 0 && input.value.length < 6){
                    let message = "The username must contain at least 6 characters";
                    input.classList.add("error");
                    input.setAttribute('content-data', message);
                    console.log(input);
                }
            })
        });
    }

}

function loginAPI(loginForm){
    const formData  = new FormData(loginForm);
    const searchPrams = new URLSearchParams();
    console.log(searchPrams);
    for( const [key, value] of formData.entries()){ //pair is an array of 2 elements : key-value //for..of iterates an object
        searchPrams.append(key, value);
    }
    console.log(searchPrams);
    fetch("https://reqres.in/api/login", {
        method : 'post',
        body: searchPrams
    }).then( response => {
        console.log(response);
        return response.json();
    }).then( data => {
        console.log(data);
        if (data.error) {
            alert(`Error: ${data.error}`); //displays error message
          } else {
            localStorage.setItem('token', data.token)
            window.open(`home.html`, '_self'); //opens the target page while Id & password matches
          }
    }).catch(err => {
        console.log(err);
    });
}

function signUpAPI(signUpForm){
    const sentData = {
        "email": signUpForm.querySelector('#email').value,
        "password": signUpForm.querySelector('#password').value,
        "first_name": signUpForm.querySelector('#name').value,
        "address": signUpForm.querySelector('#address').value
    }
    fetch("https://reqres.in/api/users",{method: 'POST', body: JSON.stringify(sentData)})
    .then(response => {
        console.log(response)
        return response.json(); })
    .then(receivedData => {
        if (receivedData.error) {
            alert(`Error: ${receivedData.error}`); //displays error message
          } else {
            localStorage.setItem('user', receivedData.id)
            window.open(`home.html`); //opens the target page while Id & password matches
          }
        console.log(receivedData)})
    .catch(e => console.log(e));
}