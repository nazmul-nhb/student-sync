import Swal from 'sweetalert2';

export const showStaticAlert = (
  title: string,
  message: string,
  icon: 'error' | 'info' | 'question' | 'success' | 'warning',
) => {
  return Swal.fire({
    title,
    text: message,
    icon,
    background: '#000000fa',
    color: '#fff',
    confirmButtonColor: '#ff0000',
  });
};

export const showConfirmDialogue = async (
  title: string,
  message: string,
  icon: 'error' | 'info' | 'question' | 'success' | 'warning',
  confirmButtonText: string = 'Yes!',
  cancelButtonText: string = 'No!',
) => {
  return await Swal.fire({
    title,
    text: message,
    icon,
    background: '#000000fa',
    color: '#fff',
    showCancelButton: true,
    confirmButtonColor: '#2a7947',
    cancelButtonColor: '#ff0000',
    confirmButtonText,
    cancelButtonText,
  });
};

export const showLoadingSpinnerAlert = (
  title: string,
  allowOutsideClick: boolean = false,
) => {
  return Swal.fire({
    title,
    text: 'Please wait for a while...',
    allowOutsideClick,
    background: '#000000fa',
    color: '#fff',
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
