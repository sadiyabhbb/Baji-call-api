/**
 * Baji999 OTP API Node.js/Express Example
 * সবকিছু এক ফাইলে রাখা হয়েছে
 */

const express = require('express');
const axios = require('axios');
const app = express();

// JSON request parse করার জন্য
app.use(express.json());

// Headers Baji999 API call এর জন্য
const headers = {
  "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJh...আপনার_token_here...",
  "content-type": "application/json",
  "accept": "application/json, text/plain, */*",
  "user-agent": "Mozilla/5.0 (Linux; Android 12; M2010J19CG Build/SKQ1.211202.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/139.0.7258.143 Mobile Safari/537.36",
  "sec-ch-ua-platform": "Android",
  "x-internal-request": "61405202",
  "x-requested-with": "mark.via.gp",
  "origin": "https://baji999.in",
  "referer": "https://baji999.in/bd/bn/member/profile/info/verify-phone"
};

// OTP পাঠানোর route
app.post('/send-otp', async (req, res) => {
  const { contact, contactType } = req.body;

  if (!contact || !contactType) {
    return res.status(400).json({ message: "contact এবং contactType দিতে হবে" });
  }

  try {
    const response = await axios.post(
      'https://baji999.in/api/wv/v1/user/getVerifyCodeByContactType',
      { contact, contactType },
      { headers }
    );

    if (response.data.code === 200) {
      res.status(200).json({
        message: 'OTP সফলভাবে পাঠানো হয়েছে',
        otp: response.data.data.otp
      });
    } else {
      res.status(400).json({
        message: 'OTP পাঠানো সম্ভব হয়নি',
        error: response.data.message
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'সার্ভার এরর',
      error: error.response ? error.response.data : error.message
    });
  }
});

// সার্ভার চালু
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`সার্ভার চলছে: http://localhost:${PORT}`);
});
