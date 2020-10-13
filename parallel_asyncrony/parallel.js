const delay = (seconds) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
});

Promise.race([
    delay(3),
    delay(2),
    delay(5),
    delay(1),
    delay(4),
]).then(() => console.log("First One Found"))


Promise.all([
    delay(3),
    delay(2),
    delay(5),
    delay(1),
    delay(4),
]).then(() => console.log("Done"))