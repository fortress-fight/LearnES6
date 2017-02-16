function timeOut (ms) {
  console.log(1);
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 2)
  })
};

timeOut(1000).then((num) => console.log(num));
