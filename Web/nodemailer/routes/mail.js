const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("../config/email");

router.post("/mail", async (req, res, next) => {
  console.log("메일 전송");
  console.log(req.body);
  try {
    const authcode = Math.floor(100000 + Math.random() * 900000).toString();
    let transporter = smtpTransport;
    const { email } = req.body;
    let mailOptions = {
      from: "c1004sos@1gmail.com", //송신할 이메일
      to: email, //수신할 이메일
      subject: "[모람모람]인증 관련 이메일 입니다",
      text: `오른쪽 숫자 6자리를 입력해주세요 : ${authcode}`,
    };
    console.log(mailOptions);
    await transporter
      .sendMail(mailOptions)
      .then(() => res.status(200).send("메일인증성공"))
      .catch(() => res.status(500).send("에러"));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/test", async (req, res) => {
  console.log("test");
  res.send("test");
});

module.exports = router;
