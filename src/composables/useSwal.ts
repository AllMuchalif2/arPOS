import Swal from 'sweetalert2';

export const swalSuccess = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'success',
    title,
    text: text || undefined,
    showConfirmButton: false,
    timer: 1800,
  });
};

export const swalError = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'error',
    title,
    text: text || undefined,
  });
};

export const swalConfirm = async (title: string, text?: string) => {
  const res = await Swal.fire({
    title,
    text: text || undefined,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
  });
  return !!res.isConfirmed;
};

export default {
  swalSuccess,
  swalError,
  swalConfirm,
};
