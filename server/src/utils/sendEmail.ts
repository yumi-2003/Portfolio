import nodemailer from "nodemailer";

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

    const info = await transporter.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message from Portfolio",
      replyTo: fromEmail,
      html: `<h2>New Message Received</h2>
        <p><strong>Name:</strong> ${fromName}</p>
        <p><strong>Email:</strong> ${fromEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("sendEmail Error:", error);
    throw error; // Re-throw to be caught by the controller
  }
};
