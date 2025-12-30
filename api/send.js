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

    const otps = ["5209", "6942", "1234", "9876", "0000", "1111", "2222", "3333"];

    for (let i = 0; i < count; i++) {
      const randomOTP = otps[Math.floor(Math.random() * otps.length)];
      
      await transporter.sendMail({
        from: `"Security Team" <${process.env.EMAIL}>`,
        to: email,
        subject: `🔐 Your OTP Code: ${randomOTP} | Important Verification`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                     max-width: 600px; margin: auto; border-radius: 10px; 
                     overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                       padding: 30px 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">🔐 Secure Verification</h1>
              <p style="margin: 10px 0 0; opacity: 0.9;">One-Time Password for Account Access</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">Hello User,</h2>
              
              <p style="color: #555; line-height: 1.6;">
                Your verification code has been generated. Use this code to complete your action:
              </p>
              
              <!-- OTP Box -->
              <div style="background: white; border-left: 4px solid #667eea; 
                         padding: 20px; margin: 25px 0; border-radius: 5px;
                         box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <p style="margin: 0 0 10px; color: #777; font-size: 14px;">YOUR VERIFICATION CODE:</p>
                <div style="font-size: 42px; font-weight: bold; color: #333; 
                           letter-spacing: 10px; text-align: center; padding: 15px;">
                  ${randomOTP}
                </div>
              </div>
              
              <p style="color: #777; font-size: 14px;">
                ⏱️ This code expires in <strong>10 minutes</strong><br>
                🔒 Do not share this code with anyone<br>
                📞 If you didn't request this, contact support immediately
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #333; color: #aaa; padding: 20px; text-align: center; font-size: 12px;">
              <p style="margin: 0 0 10px;">
                This is an automated message. Please do not reply to this email.
              </p>
              <p style="margin: 0;">
                © ${new Date().getFullYear()} SecureAuth Services | Privacy Policy
              </p>
            </div>
          </div>
        `
      });

      await new Promise(resolve => setTimeout(resolve, 500));
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
