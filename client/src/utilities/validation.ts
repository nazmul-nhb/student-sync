import { z } from 'zod';

// Regex function for password validation
export const isValidPassword = (password: string): boolean => {
  const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^</>#?&])/;
  return passwordPattern.test(password);
};

// Check for image types
export const isValidImageType = (file: File): boolean => {
  return file.type === 'image/jpeg' || file.type === 'image/png';
};

// Zod schema for user registration form validation
export const validateRegistrationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(value => isValidPassword(value), {
      message:
        'Password must contain at least one upper case letter, one lower case letter, one number, and one special character',
    }),
});

// Zod schema for user login form validation
export const validateLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(value => isValidPassword(value), {
      message:
        'Password must contain at least one upper case letter, one lower case letter, one number, and one special character',
    }),
});

// Zod schema for the student form validation
export const validateStudentSchema = z.object({
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
