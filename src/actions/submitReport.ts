"use server";

import { sendMail } from "@/lib/sendMail";
import { SendMailOptions } from "nodemailer";

// Type for the response
type SubmitReportResponse = {
  success: boolean;
  message?: string;
  caseId?: string;
};

export async function submitReport(
  formData: FormData
): Promise<SubmitReportResponse> {
  try {
    // Generate a unique case ID
    const caseId = generateUniqueCaseId();

    // Extract form fields
    const formFields: Record<string, string> = {};

    // Get all form fields except files
    formData.forEach((value, key) => {
      // Skip file entries which use the "files" key
      if (key !== "files" && typeof value === "string") {
        formFields[key] = value;
      }
    });

    // Store caseId in formFields
    formFields.caseId = caseId;

    // Process file uploads for email attachments
    const emailAttachments = [];

    // Handle multiple files with the same key "files"
    const fileEntries = formData.getAll("files");

    for (const fileEntry of fileEntries) {
      if (fileEntry instanceof Blob) {
        const file = fileEntry as File;
        const fileName = file.name;
        const fileType = file.type;

        // Add file as attachment for email
        emailAttachments.push({
          filename: fileName,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: fileType,
        });
      }
    }

    // Create HTML for the email body
    const emailHtml = generateEmailHtml(formFields, caseId);

    // Configure email options
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL, // Configure this in your .env
      subject: `New Report from web #${caseId}`,
      html: emailHtml,
      attachments: emailAttachments,
    };
    
    // Send the email
    await sendMail(mailOptions);

    return {
      success: true,
      caseId,
      message: "Report submitted successfully",
    };
  } catch (error) {
    console.error("Error in submitReport server action:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Helper function to generate unique case ID
function generateUniqueCaseId() {
  const prefix = "CYB";
  const timestamp = Date.now().toString();
  const random = Math.floor(1000 + Math.random() * 9000).toString();
  return prefix + timestamp.substring(0, 4) + random;
}

// Helper function to generate email HTML content
function generateEmailHtml(
  formData: Record<string, string>,
  caseId: string
): string {
  // Get current date and time in a readable format
  const submissionDate = new Date().toLocaleString();

  // Map incident types to readable names
  const incidentTypeMap: Record<string, string> = {
    online_fraud: "Online Shopping Fraud",
    banking_fraud: "Banking/UPI Fraud",
    identity_theft: "Identity Theft",
    social_media: "Social Media Fraud",
    phishing: "Phishing Attack",
    ransomware: "Ransomware Attack",
    other: "Other Cyber Crime",
  };

  // Get a readable incident type
  const incidentType =
    incidentTypeMap[formData.incidentType] || formData.incidentType;

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #003366; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; }
          .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
          .info-item { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .case-id { font-size: 20px; color: #003366; font-weight: bold; }
          .description { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Cyber Crime Report</h2>
          </div>
          <div class="content">
            <p>A new cyber crime incident has been reported with the following details:</p>
            
            <div class="info-item">
              <span class="label">Case ID:</span> 
              <span class="case-id">${caseId}</span>
            </div>
            
            <div class="info-item">
              <span class="label">Submission Date:</span> ${submissionDate}
            </div>
            
            <h3>Reporter Information</h3>
            <div class="info-item">
              <span class="label">Name:</span> ${formData.firstName} ${
    formData.lastName
  }
            </div>
            <div class="info-item">
              <span class="label">Email:</span> ${formData.email}
            </div>
            <div class="info-item">
              <span class="label">Phone:</span> ${formData.phone}
            </div>
            
            <h3>Incident Details</h3>
            <div class="info-item">
              <span class="label">Type of Incident:</span> ${incidentType}
            </div>
            <div class="info-item">
              <span class="label">Date of Incident:</span> ${
                formData.incidentDate
              }
            </div>
            
            <div class="info-item">
              <span class="label">Description:</span>
              <div class="description">${formData.description}</div>
            </div>
            
            ${
              formData.lossAmount
                ? `
            <div class="info-item">
              <span class="label">Financial Loss Amount:</span> ${formData.lossAmount}
            </div>`
                : ""
            }
            
            <div class="info-item">
              <span class="label">Previously Reported:</span> ${
                formData.hasReported === "yes" ? "Yes" : "No"
              }
            </div>
            
            ${
              formData.hasReported === "yes" && formData.reportDetails
                ? `
            <div class="info-item">
              <span class="label">Previous Report Details:</span>
              <div class="description">${formData.reportDetails}</div>
            </div>`
                : ""
            }
            
            <div class="footer">
              <p>This is an automated email. Please do not reply directly to this message.</p>
              <p>For further inquiries about this case, please reference the Case ID: ${caseId}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
