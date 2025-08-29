"use server";

import { sendMail } from "@/lib/sendMail";

import { z } from "zod";

// Define form validation schema
const contactUsformSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

// Types for our form
export type ContactUsformData = z.infer<typeof contactUsformSchema>;
type FormResponse = {
  success: boolean;
  message: string;
};

// Server action to send email
export async function sendContactForm(
  formData: ContactUsformData
): Promise<FormResponse> {
  try {
    // Validate form data
    const result = contactUsformSchema.safeParse(formData);
    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
      };
    }

    // Destructure the form data
    const { name, email, phone, subject, message } = result.data;

    // Configure email data
    const mailOptions = {
      from: `<${process.env.EMAIL}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL, // Where you want to receive submissions
      replyTo: email, // Set reply-to as the submitter's email
      subject: `New Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <div style="margin-top: 20px;">
    <h3 style="color: #555;">Message:</h3>
    <p style="background-color: #f5f5f5; padding: 15px; border-radius: 4px;">${message.replace(
      /\n/g,
      "<br>"
    )}</p>
  </div>
</div>
      `,
    };
    console.log("sending mail");
    // Send the email
    await sendMail(mailOptions);
    console.log("mail sent");
    // Return success
    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    };
  }
}
