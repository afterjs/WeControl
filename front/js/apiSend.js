let nome;
let form = document.getElementById("form-login");

form.addEventListener("submit", function () {
  event.preventDefault();
  let formData = new FormData(form);
  let dataJson = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  let data = JSON.stringify(dataJson);
  axios
    .post("http://localhost:3000/user/login", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log(response.data);
      sessionStorage.setItem("token", "Bearer " + response.data.token);
      nome = "agaawha";
      const alert = document.createElement("div");
          alert.classList.add("alert", "alert-success");
          alert.innerText = "Login Efetuado.";
          alert.id = "alert"
          form.prepend(alert);
          setTimeout(function() {
              document.getElementById("alert").remove();
              window.location.replace("users.html");
          }, 1000)
    })
    .catch((error) => {
          const alert = document.createElement("div");
          alert.classList.add("alert", "alert-danger");
          alert.innerText = "Username ou password errados.";
          alert.id = "alert"
          form.prepend(alert);
          setTimeout(function() {
              document.getElementById("alert").remove();
              window.location.replace("login.html");
          }, 1000)
    });
});



function writeLog(dataLog) {


    console.log(nome)



}