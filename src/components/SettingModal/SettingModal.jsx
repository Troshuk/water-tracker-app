import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { ContentLoader, Section } from 'components'; 
import { signUpSelector } from 'store/selectors';
import { signUp } from 'store/operations';
import css from './SettingModal.module.css';
import { Container, Icon } from 'components';

const SettingModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(signUpSelector);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    newPassword: '',
    repeatPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(formData));
  };

  return (
    <Section className={`${css.section} ${open ? css.open : ''}`} onClick={onClose}>
      <Container className={css.container} onClick={(e) => e.stopPropagation()}>
        <h1 className={css.title}>Setting</h1>
        <form className={css.form} onSubmit={handleSubmit}>
        <label class={css.label}>
          <span>Your photo</span>
          {/* <Avatar
                alt={`${user?.name || user.email}`}
                src="/static/images/avatar/2.jpg"
              />
              <Icon id="icon-chevron-double-up" width="16" height="16" /> */}
        </label>
        <label className={css.label}>
            <span>Your gender identity:</span>
            <div>
              <input type="radio" id="female" name="gender" value="woman" checked={formData.gender === 'female'} onChange={handleChange} />
              <label htmlFor="female">Woman</label>
              <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
              <label htmlFor="man">Man</label>
            </div>
          </label>

          <label className={css.label}>
            <span>Your name:</span>
            <input type="text" name="name" 
            value={formData.name} 
            placeholder="Name"
            onChange={handleChange} required />
          </label>
          <label className={css.label}>
            <span>E-mail:</span>
            <input type="email" name="e-mail" 
            value={formData.email}
            placeholder="E-mail"
            onChange={handleChange} required />
          </label>
          <div className={css.passwordContainer}>
            <label className={css.label}>
              <span>Password:</span>
              <span>Outdated password</span>
              <input type="password" name="password" 
              value={formData.password}
              placeholder="Password"
              onChange={handleChange} required />
              <Icon id="icon-eye" width="24" height="24" />
              <Icon id="icon-eye-slash" width="24" height="24" />
            </label>
            <label className={css.label}>
              <span>New Password:</span>
              <input type="password" name="newPassword" 
               value={formData.newPassword} 
               placeholder="Password"
               onChange={handleChange} required />
              <Icon id="icon-eye" width="24" height="24" />
              <Icon id="icon-eye-slash" width="24" height="24" />
            </label>
            <label className={css.label}>
              <span>Repeat New Password:</span>
              <input type="password" name="repeatPassword" 
              value={formData.repeatPassword} 
              placeholder="Password"
              onChange={handleChange} required />
              <Icon id="icon-eye" width="24" height="24" />
              <Icon id="icon-eye-slash" width="24" height="24" />
            </label>
          </div>
          <button type="submit" className={css.Setbtn} disabled={isLoading}>
            Save
            {isLoading ? <ContentLoader /> : <FaUserPlus />}
          </button>
        </form>
      </Container>
    </Section>
  );
};

export default SettingModal;

























// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, ContentLoader, Section } from 'components';
// import { signUpSelector } from 'store/selectors';
// import { signUp } from 'store/operations';
// import css from './SettingModal.module.css';


// const SettingModal = ({ open, onClose }) => {
//   const dispatch = useDispatch();
//   const { isLoading } = useSelector(signUpSelector);



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = {};
//   };


//   return (
//     <Section className={css.section}>
//       <Container className={css.container}>
//         <h1 className={css.title}>Setting</h1>
//         <form className={css.form} onSubmit={handleSubmit}>
//           <label className={css.label}>
//             <span>Name:</span>
//             <input type="text" name="name" required />
//           </label>
//           <label className={css.label}>
//             <span>Gender:</span>
//             <input type="text" name="gender" required />
//           </label>
//           <label className={css.label}>
//             <span>Email:</span>
//             <input type="email" name="email" required />
//           </label>
//           <label className={css.label}>
//             <span>Password:</span>
//             <input type="password" name="password" required />
//           </label>
//           <button type="submit" className={css.button} disabled={isLoading}>
//             Create an Account &nbsp;{' '}
//             {isLoading ? <ContentLoader /> : <FaUserPlus />}
//           </button>
//         </form>
//         <div className={css.redirectLink}>
//           <p>Already have an account?</p>
//           <NavLink to={LOGIN_ROUTE} className={css.link}>
//             Log In
//           </NavLink>
//         </div>
//       </Container>
//     </Section>
//   );
// };

// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';


  // const [photo, setPhoto] = useState(null);
  // const [gender, setGender] = useState('');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
//         <form onSubmit={handleSubmit}>
//           <h2 id="modal-modal-title">Settings</h2>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Your photo"
//             type="file"
//             onChange={(e) => setPhoto(e.target.files[0])}
//           />
//           <RadioGroup
//             aria-label="gender"
//             name="Your gender identity"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <FormControlLabel value="man" control={<Radio />} label="Man" />
//             <FormControlLabel value="woman" control={<Radio />} label="Woman" />
//           </RadioGroup>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Your name"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="E-mail"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Password"
//             placeholder="Enter your current password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="New Password"
//             placeholder="Enter your new password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Repeat New Password"
//             placeholder="Repeat your new password"
//             type="password"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//           />
//           <Button type="submit" variant="contained" color="primary">Save</Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default SettingModal;