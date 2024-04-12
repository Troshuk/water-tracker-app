import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#D7E3FF',
    },
    '&:hover fieldset': {
      borderColor: '#407bff',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'none',
    },
    '&.Mui-placeholder fieldset': {
      color: '#D7E3FF',
    },
  },
}));
