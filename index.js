require("dotenv").config();
const nodemailer = require("nodemailer");
const app = require('./app');
const db = require('./config/db')
const UserModel =require('./model/user.model')
const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello Node");
});

// Nodemailer Transporter (Use Gmail or SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
  },
});

// ✅ Step 1: Generate and Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save OTP to Database
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }
    await user.save();

    // Send Email with OTP
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ status: "success", message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error sending OTP" });
  }
});

// ✅ Step 2: Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ status: "error", message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ status: "error", message: "OTP expired" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null; // Remove OTP after verification
    user.otpExpires = null;
    await user.save();

    res.json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error verifying OTP" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on Port http://localhost:${port}`);
});
