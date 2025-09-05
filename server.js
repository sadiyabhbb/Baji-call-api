/**
 * Baji999 OTP API
 * Browser-friendly, GET URL দিয়ে OTP পাঠানো যাবে
 */

const express = require('express');
const axios = require('axios');
const app = express();

// JSON parse
app.use(express.json());

// Baji999 API headers
const headers = {
  "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJh...আপনার_token_here...",
  "content-type": "application/json",
  "accept": "application/json, text/plain, */*",
  "user-agent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36",
  "sec-ch-ua-platform": "Android",
  "x-internal-request": "61405202",
  "x-requested-with": "mark.via.gp",
  "origin": "https://baji999.in",
  "referer": "https://baji999.in/bd/bn/member/profile/info/verify-phone"
};

// GET route: browser থেকে call করলে OTP যাবে
app.get('/send-otp', async (req, res) => {
  const contact = req.query.contact || '01761838316';   // default number
  const contactType = req.query.contactType || 'MOBILE';

  try {
    const response = await axios.post(
      'https://baji999.in/api/wv/v1/user/getVerifyCodeByContactType',
      { contact, contactType },
      { headers }
    );

    if (response.data.code === 200) {
      res.send(`OTP সফলভাবে পাঠানো হয়েছে: ${response.data.data.otp}`);
    } else {
      res.send(`OTP পাঠানো সম্ভব হয়নি: ${response.data.message}`);
    }
  } catch (error) {
    res.send(`Server Error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
});

// Render এ deploy করার জন্য PORT dynamic
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
