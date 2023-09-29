const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.log("server start");
});

app.use(express.json()); //기본 세팅 값 불러오기

// 데이터베이스 연결 정보 설정
const db = mysql.createPool({
  host: "svc.sel5.cloudtype.app", // MySQL 서버 호스트 이름 또는 IP 주소
  port: 31718, // MySQL 서버 포트 번호
  user: "root", // MySQL 사용자 이름
  password: "191920212121", // MySQL 사용자 비밀번호
  database: "wku", // 사용할 데이터베이스 이름
});

//sql 명령어를 통해 포스팅 전부 불러오기
app.get("/posting/all", async (req, res) => {
  try {
    const [results, fields] = await db.query("select * from posting");
    res.send(results); //클라이언트로 결과 값 보내주기
    console.log(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("db 오류 발생."); //오류 처리
  }
});

//sql 명령어를 활용하여 데이터 post하기
app.post("/posting/add", async (req, res) => {
  const { title, content } = req.body; //클라이언트에서 보내는 값 받기.
  console.log(title, content);
  try {
    const [results] = await db.query(
      "INSERT INTO posting (title, content) VALUES (?, ?)", //sql 명령어
      [title, content] //sql injection을 방지하기 위해 값을 따로 분리해 놓음
    );
    res.status(200).send("게시물을 성공적으로 작성했습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("db 오류 발생.");
  }
});
