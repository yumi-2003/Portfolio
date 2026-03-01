import nodemailer from "nodemailer";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendEmail = async (
  fromName: string,
  fromEmail: string,
  message: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Attempting to send email from:", fromEmail);

    const safeName = escapeHtml(fromName);
    const safeEmail = escapeHtml(fromEmail);
    const safeMessage = escapeHtml(message);

    const info = await transporter.sendMail({
      from: `"${safeName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message from Portfolio",
      replyTo: fromEmail,
      html: `<h2>New Message Received</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("sendEmail Error:", error);
    throw error; // Re-throw to be caught by the controller
  }
};
