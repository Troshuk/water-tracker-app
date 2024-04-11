import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Slide,
};

export const notify = (message, type = 'info') =>
  toast[type](message, toastConfig);

export const notifyApi = (api, message = 'Request', useApiMessage = false) =>
  toast.promise(api, {
    ...toastConfig,
    pending: `${message} is in progress`,
    success: `${message} is completed 👌`,
    error: useApiMessage
      ? { render: ({ data }) => data?.message ?? `${message} failed` }
      : `${message} failed`,
  });
