function home() {
  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
function contact() {
  fetch("http://localhost:3000/contact")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
function cart() {
  fetch("http://localhost:3000/cart")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
