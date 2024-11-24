const END_POINT = "https://jsonplaceholder.typicode.com/users";

const defaultOptions = {
  method: "GET",
  body: null,
  headers: {
    "Content-type": "application/json",
  },
};

const response = await fetch(END_POINT);
console.log(response); // fetch를 사용하면 response 객체를 반환

async function fetchData() {
  const data = await response.json();
  console.log(data);

  data.forEach((elem) => {
    console.log(elem.name);
  });
}
fetchData();
