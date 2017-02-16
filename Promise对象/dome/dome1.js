function timeOut (ms) {
  console.log(1);
  return new Promise((resolve, reject) => {
    resolve(2);
    throw new Error('test');
    console.log(3);
  })
};

timeOut(1000).then((num) => console.log(num))
