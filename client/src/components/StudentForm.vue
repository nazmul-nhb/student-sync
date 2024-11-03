<template>
  <section class="bg-gray-100">
    <div class="w-full mx-auto max-w-screen-md p-6 bg-white rounded shadow-md">
      <h2 class="mb-4 text-2xl font-semibold text-center">Register Now!</h2>

      <form @submit.prevent="handleSubmitStudent">
        <!-- Course name -->
        <div class="input-div">
          <label for="courseName" class="label">Select a course</label>
          <select v-model="student.courseName" class="input">
            <option value="" disabled>Select a course</option>
            <option value="Basic Computer">Basic Computer</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Entry">Data Entry</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        <div class="group-inputs">
          <!-- Student Name -->
          <div class="input-div">
            <label for="studentName" class="label">Enter your name</label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              v-model="student.studentName"
              placeholder="Enter student's name"
              class="input"
            />
          </div>
          <!-- Date of Birth -->
          <div class="input-div">
            <label for="dateOfBirth" class="label">Date of Birth</label>
            <div class="input !px-1 !py-0.5">
              <VueDatePicker
                placeholder="Select date of birth"
                :enable-time-picker="false"
                :preview-format="formatDateOnly"
                v-model="student.dateOfBirth"
              />
            </div>
          </div>
        </div>

        <div class="group-inputs">
          <!-- Father's Name -->
          <div class="input-div">
            <label for="fatherName" class="label">Enter father's name</label>
            <input
              id="fatherName"
              name="fatherName"
              type="text"
              v-model="student.fatherName"
              placeholder="Enter father's name"
              class="input"
            />
          </div>

          <!-- Mother's Name -->
          <div class="input-div">
            <label for="motherName" class="label">Enter mother's name</label>
            <input
              id="motherName"
              name="motherName"
              type="text"
              v-model="student.motherName"
              placeholder="Enter mother's name"
              class="input"
            />
          </div>
        </div>

        <div class="group-inputs">
          <!-- Marital Status -->
          <div class="input-div">
            <label class="label">Marital Status</label>
            <div class="flex items-center gap-4">
              <div>
                <input
                  type="radio"
                  id="married"
                  value="married"
                  v-model="student.maritalStatus"
                  class="mr-2"
                />
                <label for="married">Married</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="unmarried"
                  value="unmarried"
                  v-model="student.maritalStatus"
                  class="mr-2"
                />
                <label for="unmarried">Unmarried</label>
              </div>
            </div>
          </div>

          <!-- Gender -->
          <div class="input-div">
            <label class="label">Gender</label>
            <div class="flex items-center gap-4">
              <div>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  v-model="student.gender"
                  class="mr-2"
                />
                <label for="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  v-model="student.gender"
                  class="mr-2"
                />
                <label for="female">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="others"
                  value="others"
                  v-model="student.gender"
                  class="mr-2"
                />
                <label for="others">Others</label>
              </div>
            </div>
          </div>
        </div>

        <div class="group-inputs">
          <!-- Highest Education -->
          <div class="input-div">
            <label for="highestEducation" class="label"
              >Highest Education</label
            >
            <input
              id="highestEducation"
              type="text"
              v-model="student.highestEducation"
              placeholder="Enter highest education"
              class="input"
            />
          </div>

          <!-- Occupation -->
          <div class="input-div">
            <label for="occupation" class="label">Occupation</label>
            <input
              id="occupation"
              type="text"
              v-model="student.occupation"
              placeholder="Enter occupation"
              class="input"
            />
          </div>
        </div>

        <!-- Institute Name -->
        <div class="input-div">
          <label for="instituteName" class="label">Institute Name</label>
          <input
            id="instituteName"
            type="text"
            v-model="student.instituteName"
            placeholder="Enter institute name"
            class="input"
          />
        </div>

        <!-- Address -->
        <div class="space-y-3 mb-4">
          <label for="address" class="label">Address</label>
          <div class="group-inputs">
            <input
              id="address"
              type="text"
              v-model="student.address.village"
              placeholder="Village"
              class="input"
            />
            <input
              type="text"
              v-model="student.address.ward"
              @input="handleNumericInput('address.ward', student)"
              placeholder="Ward"
              class="input"
            />
          </div>
          <div class="group-inputs">
            <input
              type="text"
              v-model="student.address.union"
              placeholder="Union"
              class="input"
            />
            <input
              type="text"
              v-model="student.address.postOffice"
              placeholder="Post Office"
              class="input"
            />
          </div>
          <div class="group-inputs">
            <input
              type="text"
              v-model="student.address.upazila"
              placeholder="Upazila"
              class="input"
            />
            <input
              type="text"
              v-model="student.address.district"
              placeholder="District"
              class="input"
            />
          </div>
        </div>

        <div class="group-inputs">
          <!-- Blood Group -->
          <div class="input-div">
            <label for="bloodGroup" class="label">Student's Blood Group</label>
            <select id="bloodGroup" v-model="student.bloodGroup" class="input">
              <option value="" disabled>Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <!-- NID -->
          <div class="input-div">
            <label for="NID" class="label">Enter student's NID</label>
            <input
              id="NID"
              type="text"
              v-model="student.NID"
              @input="handleNumericInput('NID', student)"
              placeholder="Enter NID"
              class="input"
            />
          </div>
        </div>

        <div class="group-inputs">
          <!-- Student Mobile -->
          <div class="input-div">
            <label for="studentMobile" class="label">Student Mobile</label>
            <input
              id="studentMobile"
              type="text"
              v-model="student.studentMobile"
              @input="handleNumericInput('studentMobile', student)"
              placeholder="Enter student mobile number"
              class="input"
            />
          </div>
          <!-- Guardian Mobile -->
          <div class="input-div">
            <label for="guardianMobile" class="label">Guardian Mobile</label>
            <input
              id="guardianMobile"
              type="text"
              v-model="student.guardianMobile"
              @input="handleNumericInput('guardianMobile', student)"
              placeholder="Enter guardian mobile number"
              class="input"
            />
          </div>
        </div>

        <!-- Student Email -->
        <div class="input-div">
          <label for="studentEmail" class="label">Enter student's email</label>
          <input
            id="studentEmail"
            type="email"
            v-model="student.studentEmail"
            placeholder="Enter student's email"
            class="input"
          />
        </div>

        <!-- JSC/SS/Equivalent Education -->
        <div class="input-div space-y-2">
          <label for="minimumEducation" class="label"
            >JSC/SSC/HSC/Equivalent</label
          >
          <div class="group-inputs">
            <input
              type="text"
              v-model="student.minimumEducation.roll"
              placeholder="Roll Number"
              class="input"
            />
            <input
              type="text"
              v-model="student.minimumEducation.registration"
              placeholder="Registration Number"
              class="input"
            />
            <select
              v-model="student.minimumEducation.examination"
              class="input"
            >
              <option value="" disabled>Select Examination</option>
              <option value="JSC">JSC</option>
              <option value="SSC">SSC</option>
              <option value="HSC">HSC</option>
            </select>
          </div>
          <div class="group-inputs">
            <input
              type="number"
              v-model="student.minimumEducation.GPA"
              placeholder="GPA"
              class="input"
            />
            <select v-model="student.minimumEducation.board" class="input">
              <option value="" disabled>Select Board</option>
              <option value="Barisal">Barisal</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Cumilla">Cumilla</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Dinajpur">Dinajpur</option>
              <option value="Jessore">Jessore</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Technical">Technical</option>
              <option value="Madrasah">Madrasah</option>
              <option value="DIBS(Dhaka)">DIBS(Dhaka)</option>
            </select>
            <input
              id="passingYear"
              type="text"
              v-model="student.minimumEducation.passingYear"
              @input="
                handleNumericInput('minimumEducation.passingYear', student)
              "
              placeholder="Passing year"
              class="input"
            />
          </div>
        </div>

        <button type="submit" class="button">Submit</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { toast } from 'vue3-toastify';
import VueDatePicker from '@vuepic/vue-datepicker';
import type {
  IRegResponse,
  IStatusResponse,
  IStudentData,
  IUser,
} from '@/types/interfaces';
import { useAxiosSecure } from '@/hooks/useAxiosSecure';
import { formatDateOnly } from '@/utilities/formatDate';
import {
  handleNumericInput,
  validateStudentSchema,
} from '@/utilities/validation';
import { AxiosError } from 'axios';
import { clearReactiveForm } from '@/utilities/clearForm';
import { useRouter } from 'vue-router';
import { showConfirmDialogue, showStaticAlert } from '@/utilities/sweetAlert';

// Get current user props
const { currentUser } = defineProps<{ currentUser: IUser }>();

const router = useRouter();

// Axios instance
const axiosSecure = useAxiosSecure();

// Define reactive student data
const student = reactive<IStudentData>({
  courseName: '',
  studentName: currentUser.name,
  fatherName: '',
  motherName: '',
  dateOfBirth: null,
  maritalStatus: '',
  gender: '',
  highestEducation: null,
  occupation: null,
  instituteName: null,
  address: {
    village: '',
    ward: '',
    union: '',
    postOffice: '',
    upazila: '',
    district: '',
  },
  bloodGroup: '',
  NID: null,
  studentMobile: '',
  guardianMobile: '',
  studentEmail: currentUser.email,
  minimumEducation: {
    roll: null,
    registration: null,
    examination: '',
    GPA: null,
    board: '',
    passingYear: null,
  },
});

// Handle form submission
const handleSubmitStudent = async (): Promise<void> => {
  // Validate the student data using Zod
  const result = validateStudentSchema.safeParse(student);

  if (!result.success) {
    // Display each validation error as a toast notification
    result.error.errors.forEach(error => {
      toast.error(error.message);
      console.log(error);
    });
    return;
  }

  // If validation succeeds, proceed with form submission
  try {
    // Ask permission to submit form
    const proceed = await showConfirmDialogue(
      'Submit Now?',
      'Do you want to submit the form now?',
      'question',
    );

    // Proceed to submit
    if (proceed.isConfirmed) {
      const { data } = await axiosSecure.post<IRegResponse>(
        '/student/register',
        student,
      );

      if (data.success) {
        toast.success(data.message);
        clearReactiveForm(student);

        // Ask permission to go to the download page
        const proceedDownload = await showConfirmDialogue(
          'Form Submitted',
          'Do you want to download your copy now?',
          'success',
        );

        // Proceed to the download page
        if (proceedDownload.isConfirmed) {
          router.push(`/download/${data.registrationID}`);
        }
      } else {
        toast.error(data.message);
        showStaticAlert(
          'Cannot SUbmit Form!',
          data.message || 'Something went Wrong!',
          'error',
        );
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<IStatusResponse>;
      if (axiosError.response && axiosError.response.data) {
        showStaticAlert(
          error.message,
          axiosError.response.data.message,
          'error',
        );
      } else {
        toast.error('Something went Wrong!');
      }
    } else if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
</script>

<style scoped>
.input-div {
  @apply w-full mb-4;
}

.group-inputs {
  @apply flex items-center justify-between gap-6;
}

.label {
  @apply mb-3;
}

.input {
  @apply w-full px-3 py-2 rounded outline-none border border-gray-700/15 shadow-md shadow-gray-700 transition-all duration-500 ease-in-out;
}

.input:focus {
  @apply bg-gray-200 -translate-y-1;
}

.button {
  @apply font-semibold border bg-blue-900 text-white border-blue-800/15 rounded-lg shadow-md shadow-blue-900 px-3 py-1.5 transition-all duration-500 ease-in-out;
}

.button:hover {
  @apply bg-blue-600 -translate-y-1; /* Lift the button slightly */
}

.button:focus {
  @apply shadow-md shadow-blue-500;
}

/* Add the click effect */
.button:active {
  @apply transform translate-y-1 bg-blue-200 text-blue-800 shadow-sm shadow-blue-800; /* Move down when pressed */
}
</style>
