"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { submitReport } from "@/actions/submitReport";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, Shield, Upload } from "lucide-react";
import { toast } from "sonner";

// Define Zod schemas for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

const incidentDetailsSchema = z.object({
  incidentType: z.string().min(1, "Please select an incident type"),
  incidentDate: z.string().min(1, "Date of incident is required"),
  description: z.string().min(10, "Please provide a detailed description"),
  lossAmount: z.string().optional(),
  hasReported: z.string().min(1, "Please select an option"),
  reportDetails: z.string().optional(),
});

// Combine all schemas
const completeFormSchema = personalInfoSchema
  .merge(incidentDetailsSchema)
  .extend({
    fileUploads: z.any().optional(),
  });
// Define the form data type
type FormValues = z.infer<typeof completeFormSchema>;

const ReportForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUploads, setFileUploads] = useState<File[]>([]);
  const [caseId, setCaseId] = useState("");

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(completeFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      incidentType: "",
      incidentDate: "",
      description: "",
      lossAmount: "",
      hasReported: "",
      reportDetails: "",
      fileUploads: [],
    },
  });

  // Watch hasReported field to conditionally show reportDetails
  const hasReported = watch("hasReported");
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
  const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25 MB in bytes (Gmail limit)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Calculate total size of already uploaded files
      const currentTotalSize = fileUploads.reduce(
        (total, file) => total + file.size,
        0
      );

      // Check files for size limits
      const invalidFiles: string[] = [];
      let newTotalSize = currentTotalSize;

      const validFiles = newFiles.filter((file) => {
        // Check individual file size
        if (file.size > MAX_FILE_SIZE) {
          invalidFiles.push(`${file.name} (exceeds 10 MB limit)`);
          return false;
        }

        // Check if adding this file would exceed total limit
        newTotalSize += file.size;
        if (newTotalSize > MAX_TOTAL_SIZE) {
          invalidFiles.push(`${file.name} (would exceed total 25 MB limit)`);
          return false;
        }

        return true;
      });

      // Show error messages for invalid files
      if (invalidFiles.length > 0) {
        toast.error("Some files couldn't be added", {
          description: invalidFiles.join(", "),
          duration: 5000,
        });
      }

      // Update state with valid files only
      if (validFiles.length > 0) {
        setFileUploads([...fileUploads, ...validFiles]);
        setValue("fileUploads", [...fileUploads, ...validFiles] as any);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...fileUploads];
    newFiles.splice(index, 1);
    setFileUploads(newFiles);
    setValue("fileUploads", newFiles);
  };

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];

    // Determine which fields to validate based on current step
    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "email", "phone"];
    } else if (step === 2) {
      fieldsToValidate = [
        "incidentType",
        "incidentDate",
        "description",
        "hasReported",
      ];
      if (hasReported === "yes") {
        fieldsToValidate.push("reportDetails");
      }
    }

    // Trigger validation for the specified fields
    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid) {
      setStep(step + 1);
    } else {
      // Show error toast if validation fails
      toast.error("Please fill in all required fields correctly", {
        duration: 3000,
      });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  function generateUniqueCaseId() {
    const prefix = "CYB";
    const timestamp = Date.now().toString();
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    return prefix + timestamp.substring(0, 4) + random;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("report data", data);
    try {
      // Create a FormData object to send files and form data
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        // Skip fileUploads as we'll handle them separately
        if (key !== "fileUploads") {
          formDataToSend.append(key, value as string);
        }
      });

      // Add each file to FormData
      fileUploads.forEach((file) => {
        formDataToSend.append(`files`, file);
      });

      // Call the server action with the FormData
      const result = await submitReport(formDataToSend);

      if (result.success) {
        toast.success("Report Submitted Successfully", {
          description:
            "Your case has been registered. A confirmation email has been sent with the details.",
          duration: 5000,
        });

        const newCaseId = result.caseId || generateUniqueCaseId();
        setCaseId(newCaseId);
        setStep(4);
      } else {
        toast.error("Submission Failed", {
          description:
            result.message ||
            "There was an error submitting your report. Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission Error", {
        description: "An unexpected error occurred. Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className={`w-full px-4 py-2 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className={`w-full px-4 py-2 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-4 py-2 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button className="btn-primary" onClick={nextStep}>
                Continue to Incident Details
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Incident Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="incidentType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Type of Incident *
                  </label>
                  <select
                    id="incidentType"
                    {...register("incidentType")}
                    className={`w-full px-4 py-2 border ${
                      errors.incidentType ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                  >
                    <option value="">Select incident type</option>
                    <option value="online_fraud">Online Shopping Fraud</option>
                    <option value="banking_fraud">Banking/UPI Fraud</option>
                    <option value="identity_theft">Identity Theft</option>
                    <option value="social_media">Social Media Fraud</option>
                    <option value="phishing">Phishing Attack</option>
                    <option value="ransomware">Ransomware Attack</option>
                    <option value="other">Other Cyber Crime</option>
                  </select>
                  {errors.incidentType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.incidentType.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="incidentDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    id="incidentDate"
                    {...register("incidentDate")}
                    className={`w-full px-4 py-2 border ${
                      errors.incidentDate ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer`}
                    onClick={(e) => e.currentTarget.showPicker()}
                  />
                  {errors.incidentDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.incidentDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description of Incident *
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows={5}
                  placeholder="Please provide detailed information about what happened"
                  className={`w-full px-4 py-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lossAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Financial Loss Amount (if applicable)
                </label>
                <input
                  type="text"
                  id="lossAmount"
                  {...register("lossAmount")}
                  placeholder="e.g., ₹10,000"
                  className={`w-full px-4 py-2 border ${
                    errors.lossAmount ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                />
                {errors.lossAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lossAmount.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="hasReported"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Have you reported this incident elsewhere? *
                </label>
                <select
                  id="hasReported"
                  {...register("hasReported")}
                  className={`w-full px-4 py-2 border ${
                    errors.hasReported ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasReported && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.hasReported.message}
                  </p>
                )}
              </div>

              {hasReported === "yes" && (
                <div>
                  <label
                    htmlFor="reportDetails"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Details of Previous Report
                  </label>
                  <textarea
                    id="reportDetails"
                    {...register("reportDetails")}
                    rows={3}
                    placeholder="Please provide details about where, when, and any reference numbers"
                    className={`w-full px-4 py-2 border ${
                      errors.reportDetails
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-colors`}
                  ></textarea>
                  {errors.reportDetails && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.reportDetails.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button className="btn-primary" onClick={nextStep}>
                Continue to Documentation
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">
              Supporting Documentation
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-3" />
                <p className="text-sm text-blue-800">
                  Please upload any evidence related to the incident
                  (screenshots, transaction records, communication logs, etc.)
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Files
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center relative"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.dataTransfer.files) {
                      handleFileChange({ target: { files: e.dataTransfer.files } } as any);
                    }
                  }}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    Drag and drop files here, or click to select files
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Max 10 MB per file. Total limit 25 MB. Supported formats:
                    JPG, PNG, PDF, DOCX
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.docx"
                  />
                  <Button 
                    type="button"
                    className="mt-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>

              {/* File List */}
              {fileUploads.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Uploaded Files</h3>
                  <ul className="space-y-2">
                    {fileUploads.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
                  <p className="text-sm text-yellow-800">
                    By submitting this form, you declare that all information
                    provided is accurate to the best of your knowledge.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button
                className="btn-primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>Submit Report</>
                )}
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-fade-in text-center py-12">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Report Submitted Successfully!
            </h2>
            <p className="text-xl mb-8">
              Your case has been registered with reference number:
            </p>
            <div className="bg-gray-100 p-4 rounded-md text-center inline-block">
              <span className="font-mono text-2xl font-bold">{caseId}</span>
            </div>
            <p className="mt-6 text-gray-600 max-w-md mx-auto">
              Our team will review your report and contact you within 24 hours
              with next steps. Please keep this reference number for all future
              communications.
            </p>
            <div className="mt-10">
              <Button
                className="btn-primary"
                onClick={() => (window.location.href = "/")}
              >
                Return to Homepage
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {step < 4 && (
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <div className="relative">
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(step / 3) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                  ></div>
                </div>
                <div className="flex justify-between">
                  <div
                    className={`text-xs font-semibold ${
                      step >= 1 ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    Personal Info
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      step >= 2 ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    Incident Details
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      step >= 3 ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    Documentation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-8">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ReportForm; 