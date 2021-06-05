
let username;
let identificador;

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
          sessionStorage.setItem("token", "Bearer " + response.data.token);
          sessionStorage.setItem("username", response.data.info.username);
          sessionStorage.setItem("identificador", response.data.info.identificador);
          sessionStorage.setItem("tipo", response.data.info.tipo);
          sessionStorage.setItem("nome", response.data.info.nome);

          let dataInfo;
          dataInfo = "O utilizador " + response.data.info.username + " | " + response.data.info.identificador + " fez login.";
          writeLog(dataInfo);

          const alert = document.createElement("div");
          alert.classList.add("alert", "alert-success");
          alert.innerText = "Login Efetuado.";
          alert.id = "alert"
          form.prepend(alert);
          setTimeout(function() {
              document.getElementById("alert").remove();
              if(sessionStorage.getItem("tipo") === "admin") {
                window.location.replace("works.html");
              } else {
                window.location.replace("worksUser.html");
              }
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

function writeLog(info) {

    let dataString = {"info": info};
    let data = JSON.stringify(dataString);

    axios.post("http://localhost:3000/log/newLog", data, {
        headers: { 
          'Authorization': sessionStorage.getItem("token"),
          "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });

}