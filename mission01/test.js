let a = 2;

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    let a = 5;
    console.log(a);
    resolve("결과값");
  }, 1000);
});

p.then((res) => {
  console.log(res);
});
