const express = require("express");
const router = express.Router();
const smtpTransport = require("../config/email");

router.use(express.urlencoded({ extended: false }));

const generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

// Assuming you have these values defined somewhere in your application
// You should replace these with your actual implementation
const statusCode = { OK: 200, BAD_REQUEST: 400 };
const util = {
  fail: (code, msg) => ({ code, msg }),
  success: (code, msg) => ({ code, msg }),
};
const responseMsg = {
  AUTH_EMAIL_FAIL: "Email auth failed",
  AUTH_EMAIL_SUCCESS: "Email auth successful",
};

const auth = {
  SendEmail: async (req, res) => {
    const number = generateRandom(111111, 999999);

    console.log(req.body);
    const { sendEmail } = req.body;
    console.log(sendEmail);
    const mailOptions = {
      from: "메일인증테스트",
      to: sendEmail,
      subject: "[러버덕]인증 관련 이메일 입니다",
      text: "오른쪽 숫자 6자리를 입력해주세요 : " + number,
    };

    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          return res
            .status(statusCode.OK)
            .send(
              util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL)
            );
        } else {
          /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
          return res.status(statusCode.OK).send(
            util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
              number: number,
            })
          );
        }
        smtpTransport.close();
      }
    );
  },
};

router.post("/email", auth.SendEmail);

module.exports = router;
