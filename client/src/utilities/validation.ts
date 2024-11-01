import { z } from 'zod';

// Regex function for email validation
export const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Regex function for password validation
export const isValidPassword = (password: string): boolean => {
  const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
  return passwordPattern.test(password);
};

// Define the Zod schema for the student object
export const validateStudent = z.object({
  courseName: z.string().min(1, { message: 'Course name is required' }),
  studentName: z.string().min(1, { message: 'Student name is required' }),
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  dateOfBirth: z.date().nullable(),
  maritalStatus: z.string().min(1, { message: 'Provide your marital status' }),
  gender: z.string().min(1, { message: 'Provide your marital status' }),
  highestEducation: z.string().nullable(),
  occupation: z.string().nullable(),
  instituteName: z.string().nullable(),
  address: z.object({
    village: z.string().min(1, { message: 'Provide your village/area name' }),
    ward: z.string().min(1, { message: 'Provide your ward number' }),
    union: z.string().min(1, { message: 'Provide your union name' }),
    postOffice: z.string().min(1, { message: 'Provide your post office name' }),
    upazila: z.string().min(1, { message: 'Provide your upazila name' }),
    district: z.string().min(1, { message: 'Provide your district name' }),
  }),
  bloodGroup: z.string().optional(),
  NID: z.string().nullable(),
  studentMobile: z.string().min(1, { message: 'Provide your mobile number' }),
  guardianMobile: z.string().optional(),
  studentEmail: z
    .string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Provide your email address' }),
  minimumEducation: z.object({
    roll: z.string().nullable(),
    registration: z.string().nullable(),
    GPA: z.number().nullable(),
    board: z.string().optional(),
  }),
});
