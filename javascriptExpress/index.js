const { default: axios } = require("axios");
const express = require("express");
const fs = require("fs");

const app = express();
const port = 8000;

app.get("/performance", (req, res) => {
  res.send("hello");
});

app.get("/performance/fileTest", (req, res) => {
  let start = new Date().getTime();

  const count = 100;
  // stream 방식 사용(비동기)
  // for (let i = 0; i < count; i++) {
  //   const writeStream = fs.createWriteStream(`data/${i}file.txt`);
  //   for (let j = 0; j < count; j++) {
  //     writeStream.write(`${i} 파일의 ${j} 번째 줄 입니다.\n`);
  //   }
  //   writeStream.end();
  // }

  // const data = [];
  // let dataString = "";
  // for (let i = 0; i < count; i++) {
  //   const readStream = fs.createReadStream(`data/${i}file.txt`);

  //   readStream.on("data", (chunk) => {
  //     data.push(chunk);
  //   });

  //   readStream.on("end", () => {
  //     dataString = Buffer.concat(data).toString();
  //     let end = new Date().getTime();
  //     console.log(`실행시간: ${(end - start) / 1000} 초`);
  //   });
  // }

  // sync
  for (let i = 0; i < count; i++) {
    let data = "";
    for (let j = 0; j < count; j++) {
      data += `${i} 파일의 ${j} 번째 줄 입니다.\n`;
    }
    fs.writeFileSync(`data/${i}file.txt`, data);
  }

  for (let i = 0; i < count; i++) {
    const data = fs.readFileSync(`data/${i}file.txt`, {
      encoding: "utf8",
      flag: "r",
    });
  }

  let end = new Date().getTime();
  console.log(`실행시간: ${(end - start) / 1000} 초`);

  res.send("success");
});

const getData = async () => {
  return await axios.get(
    "https://22f3baa6-14d8-403f-959e-476ca9d4376e.mock.pstmn.io/test"
  );
};

app.get("/performance/httpTest", async (req, res) => {
  let start = new Date().getTime();
  const { data } = await getData();
  console.log(data);
  let end = new Date().getTime();
  console.log(`실행시간: ${(end - start) / 1000} 초`);
  res.send("success");
});

app.listen(port, () => {
  console.log(`Express server start, port: ${port}`);
});
