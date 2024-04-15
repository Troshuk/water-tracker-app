import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { ContentLoader } from 'components';
import { signUpSelector } from 'store/selectors';
import { signUp } from 'store/operations';
import { Icon } from 'components';
import { Link } from 'react-router-dom';
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
    repeatPassword: '',
  });

  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('avatar', formData.avatar);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('newPassword', formData.newPassword);
    formDataToSend.append('repeatPassword', formData.repeatPassword);

    dispatch(signUp(formDataToSend));
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <ReactModal
      contentLabel="Modal"
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <div className={css.Container} onClick={e => e.stopPropagation()}>
        <h1 className={css.title}>Setting</h1>
        <button className={css.backdrop}
          type="button"
          onClick={onClose}
          class="close-btn"
          aria-label="modal close"
        >
          <Icon id="icon-arrow-up-tray" width="16" height="16" />
        </button>
        <form className={css.form} onSubmit={handleSubmit}>
        
        <div className={css.setContainer}>  
        <label class={css.label}>
            <span className={css.subTitle}>Your photo</span>
            <div className={css.photoContainer}> 
            <Icon id="icon-user" width="32" height="32"/>

           <Link to="">  <span class={css.upload}> <Icon className={css.iconArrow}
            id="icon-arrow-up-tray" width="16" height="16" /> Upload a photo</span> 
          </Link>
             
            </div>        
          </label>

          <label className={css.label}>
            <span className={css.subTitle}>Your gender identity</span>
            <div className={css.inputGender}>
              <input
                type="radio"
                id="female"
                name="gender"
                value="woman"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              <label htmlFor="female" className={css.gender}>
                Woman
              </label>

              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              <label htmlFor="man" className={css.gender}>
                Man
              </label>
            </div>
          </label>

          <label className={css.label}>
            <span className={css.subTitle}>Your name</span>
            <input
              type="text"
              name="name"
              className={css.input}
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              required
            />
            </label>
          <label className={css.label}>
            <span className={css.subTitle}>E-mail</span>
            <input
              type="email"
              name="e-mail"
              className={css.input}
              value={formData.email}
              placeholder="E-mail"
              onChange={handleChange}
              required
            />
          </label>
          </div>
        
          <div className={css.passwordContainer}>
            <label className={css.label}>
              <span className={css.subTitle}>Password</span>
              <span className={css.subPas}>Outdated password:</span>
              <div className={css.inputContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={css.input}
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.eyeBtn}>
      <Icon id={showPassword ? "icon-eye-slash" : "icon-eye"} width="24" height="24" />
    </button>
    </div>
           </label>
            <label className={css.label}>
              <span className={css.subPas}>New Password:</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                className={css.input}
                value={formData.newPassword}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={css.eyeBtn}
                >
                <Icon id={showPassword ? "icon-eye-slash" : "icon-eye"} width="24" height="24" />
                </button>
            </label>
            <label className={css.label}>
              <span className={css.subPas}>Repeat New Password:</span>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                name="repeatPassword"
                className={css.input}
                value={formData.repeatPassword}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <button
                  type="button"
                  onClick={toggleRepeatPasswordVisibility}
                  className={css.eyeBtn}
                >
                <Icon id={showPassword ? "icon-eye-slash" : "icon-eye"} width="24" height="24" />
                </button>
                </label>
          </div>
          <button type="submit" className={css.Setbtn} disabled={isLoading}>
            Save
            {isLoading ? <ContentLoader /> : <FaUserPlus />}
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default SettingModal;
