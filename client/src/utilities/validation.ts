import dayjs from 'dayjs';
import { z } from 'zod';

// Regex function for password validation
export const isValidPassword = (password: string): boolean => {
  const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^</>#?&])/;
  return passwordPattern.test(password);
};

// Function to set a nested property given its path, ensure it's numeric, and allow user-entered leading 0
export const handleNumericInput = <T extends Record<string, unknown>>(
  path: string,
  object: T,
) => {
  // Split the path into keys to access the nested property
  const keys = path.split('.');
  let obj: Record<string, unknown> | undefined = object;

  // Traverse to the second-to-last key
  for (let i = 0; i < keys.length - 1; i++) {
    if (obj && typeof obj === 'object' && keys[i] in obj) {
      obj = obj[keys[i]] as Record<string, unknown>;
    } else {
      // Exit if the key does not exist in the object
      return;
    }
  }

  // Set the last key, filtering out any non-numeric characters
  const lastKey = keys[keys.length - 1];

  // Retrieve the input value for the field
  let input = obj && lastKey in obj ? obj[lastKey] : undefined;

  // Only allow numbers and retain the user-entered leading zero
  if (typeof input === 'string') {
    input = input.replace(/\D/g, '');
    obj[lastKey] = input;
  } else if (typeof input === 'number') {
    obj[lastKey] = input;
  }
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
  courseName: z.string().min(1, { message: 'Select a course to continue' }),
  studentName: z.string().min(1, { message: 'Student name is required' }),
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  dateOfBirth: z.date().nullable(),
  maritalStatus: z.string().min(1, { message: 'Provide your marital status' }),
  gender: z.string().min(1, { message: 'Provide your gender' }),
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
    examination: z.string().optional(),
    GPA: z.number().nullable(),
    board: z.string().optional(),
    passingYear: z.string().nullable(),
  }),
});

export const validateAge = (date: string | Date): boolean => {
  const age = dayjs().diff(dayjs(date), 'year');
  return age >= 14;
};
