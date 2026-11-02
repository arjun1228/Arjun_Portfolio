import nodemailer from 'nodemailer';

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const isSmtpConfigured = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  if (!isSmtpConfigured) {
    console.log(`[Email Simulation] SMTP not fully configured. Email would be sent:
    From: ${name} <${email}>
    Subject: ${subject}
    Message: ${message}`);
    return { simulated: true, success: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    subject: `[Portfolio Contact] ${subject} - from ${name}`,
    text: `You have received a new contact submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #8b5cf6;">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 15px; padding: 15px; background: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 4px;">
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
};
