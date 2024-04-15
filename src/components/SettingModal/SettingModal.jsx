import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { ContentLoader, Section } from 'components'; 
import { signUpSelector } from 'store/selectors';
import { signUp } from 'store/operations';
import { Container, Icon } from 'components';
// import Avatar from '@mui/material/Avatar';
import css from './SettingModal.module.css';


const SettingModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(signUpSelector);
  const [formData, setFormData] = useState({
    avatar: '',
    gender: '',
    name: '',
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
    const formDataToSend = new FormData();
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("newPassword", formData.newPassword);
    formDataToSend.append("repeatPassword", formData.repeatPassword);
    
    dispatch(signUp(formDataToSend));
  };


  return (
    <Section className={`${css.section} ${open ? css.open : ''}`} onClick={onClose}>
      <Container className={css.container} onClick={(e) => e.stopPropagation()}>
        <h1 className={css.title}>Setting</h1>
        <button type="button" onClick={onClose} class="close-btn" aria-label="modal close">
        <Icon id="icon-arrow-up-tray" width="16" height="16" />
      </button>
        <form className={css.form} onSubmit={handleSubmit}>
        <label class={css.label}>
          <span className={css.subTitle}>Your photo</span>
          {/* <Avatar
                alt={`${user?.name || user.email}`}
                src="/static/images/avatar/2.jpg"
              /> */}
              <Icon id="icon-arrow-up-tray" width="16" height="16" />
        </label>
        
        <label className={css.label}>
            <span className={css.subTitle}>Your gender identity</span>
            <div>
              <input type="radio" id="female" name="gender" value="woman" checked={formData.gender === 'female'} onChange={handleChange} />
              <label htmlFor="female" className={css.gender}>Woman</label>
              <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
              <label htmlFor="man" className={css.gender}>Man</label>
            </div>
          </label>

          <label className={css.label}>
            <span className={css.subTitle}>Your name</span>
            <input type="text" name="name" className={css.placeholder}        
            value={formData.name} 
            placeholder="Name"
            onChange={handleChange} required />
          </label>
          <label className={css.label}>
            <span className={css.subTitle}>E-mail</span>
            <input type="email" name="e-mail" className={css.placeholder} 
            value={formData.email}
            placeholder="E-mail"
            onChange={handleChange} required />
          </label>
          <div className={css.passwordContainer}>
            <label className={css.label}>
              <span className={css.subTitle}>Password</span>
              <span className={css.subPas}>Outdated password:</span>
              <div className={css.inputContainer}> 
              <input type="password" name="password" className={css.placeholder} 
              value={formData.password}
              placeholder="Password"
              onChange={handleChange} required  
            />
               <Icon id="icon-eye" width="24" height="24"/>
              </div>
              
              <Icon id="icon-eye-slash" width="24" height="24" />
            </label>
            <label className={css.label}>
              <span className={css.subPas}>New Password:</span>
              <input type="password" name="newPassword" className={css.placeholder} 
               value={formData.newPassword} 
               placeholder="Password"
               onChange={handleChange} required />
              <Icon id="icon-eye" width="24" height="24" />
              <Icon id="icon-eye-slash" width="24" height="24" />
            </label>
            <label className={css.label}>
              <span className={css.subPas}>Repeat New Password:</span>
              <input type="password" name="repeatPassword" className={css.placeholder} 
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




