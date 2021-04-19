const { default: axios } = require("axios");
const express = require("express");
const fs = require("fs");
const {Client} = require("pg");
const Query = require("pg").Query;

// DB connection
const client = new Client({
  user : 'devimgdl', host : '10.203.7.146', database : 'devimgdldb', password : 'd2vimgdl146^', port : 5475
});

const app = express();
const port = 7010;

app.get("/performance", (req, res) => {
  res.send("hello");
});

app.get("/fileTest", (req, res) => {
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

  for(let i =0; i < count; i++){
    fs.unlinkSync(`data/${i}file.txt`);
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

app.get("/httpTest", async (req, res) => {
  let start = new Date().getTime();
  const { data } = await getData();
  console.log(data);
  let end = new Date().getTime();
  console.log(`실행시간: ${(end - start) / 1000} 초`);
  res.send("success");
});

app.get("/dbTest", (req, res) => {
  let start = new Date().getTime();
  let count = 10;
  //Insert
  const insertSql = "INSERT INTO cbot_token VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  for(let i = 0; i < count; i++ ){
    const values= [`id${i}`, `cntt${i}`, 'test', 'Y', '163235', 'now()', '163235', 'now()']
    client.query(insertSql, values, (err,result) => {
      if(err){
        console.log(err.stack);
      }else{
        console.log("insert success")
      }
    })
  }

  //Select
  const selectSql = "SELECT * FROM cbot_token WHERE cbot_enty_grp_id=$1"
  client.query(selectSql, ['test'], (err, result) => {
    if(err){
      console.log(err.stack);
    }else{
      console.log("select success");
    }
  })

  //Delete
  const deleteSql = "DELETE FROM cbot_token WHERE cbot_enty_grp_id=$1"
  client.query(deleteSql, ['test'], (err, result) => {
    if(err){
      console.log(err.stack);
    }else{
      console.log("delete success");
      let end = new Date().getTime();
      console.log(`실행시간: ${(end - start) / 1000} 초`);
    }
    res.send("success")
  })

});

app.listen(port, () => {
  client.connect(err => {
    if(err){
      console.log("connection error", err.stack)
    }else{
      console.log("database connection success!");
    }
  });
  console.log(`Express server start, port: ${port}`);
});
