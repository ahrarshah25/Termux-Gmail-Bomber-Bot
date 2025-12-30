import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, count } = req.body;

  if (!email || !count || count < 1 || count > 100) {
    return res.status(400).json({
      error: "Invalid email or count (1–100 only)"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    for (let i = 0; i < count; i++) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Termux Gmail Bomber Bot",
        text: "Hey Your OTP Code Is: \n5209."
      });
    }

    return res.json({
      success: `Sent ${count} emails to ${email}`
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
