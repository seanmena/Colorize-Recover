$(document).ready(() => {
  const login = $("form#login");
  login.on("submit", (event) => {
    event.preventDefault();
    $.post("/auth/login", {
      email: $("#email-input1").val().trim(),
      password: $("#password-input1").val().trim()
    }).done((res, status) => {
      console.log(res, status);
      window.location.replace("/");
    });
  });
    
  const signup = $("form#signup");
  signup.on("submit", (event) => {
    event.preventDefault();
    $.post("/auth/signup", {
      email: $("#email-input2").val().trim(),
      password: $("#password-input2").val().trim()
    }).done((res, status) => {
      console.log(res, status);
      window.location.replace("/");
    });
  });
});