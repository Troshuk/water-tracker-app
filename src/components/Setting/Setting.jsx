import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { Oval } from 'react-loader-spinner';
import { Icon } from 'components';

import { useFormik } from 'formik';
import {
  StModalBackdrope,
  StModalWrap,
  StyledSettingModal,
  Title,
  BtnSvg,
  WrapHeader,
  ImgWrapper,
  AvatarWrap,
  UploadLabel,
  FileInput,
  UploadButton,
  StyledRadioGroup,
  StyledRadioInput,
  StyledRadioCircle,
  StyledRadioLabel,
  StyledRadioText,
  CircleColor,
  Button,
  WrapInfo,
  Input,
  EmailText,
  PasswordText,
  PasswordTitle,
  InputPassword,
  ButtonEye,
  InputPasswordWrap,
  MessageError,
  Label,
} from './Setting.styled.js';
import { AuthReducerSelector } from 'store/selectors';

import { SettingModalSchema } from '../../schemasValdiate/SettingModalSchema.jsx';
// import {
//   updateAvatarThunk,
//   updateThunk,
// } from '../../redux/users/usersOperations';
// import { selectIsLoading } from '../../redux/selectors';

export const SettingModal = ({ settingModalIsOpen, closeModal }) => {
  const { user } = useSelector(AuthReducerSelector);

  //   const isLoading = useSelector(selectIsLoading);

  const avatarURL = user.avatarURL;
  const gender = user.gender;
  const username = user.name;
  const email = user.email;
  //   const token = useSelector(state => state.auth.token);

  //   const [loader, setLoader] = useState(false);
  const [genderValue, setGenderValue] = useState(user.gender);
  const [imgSize, setImgSize] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username,
      email,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    //     onSubmit: async values => {
    //       try {
    //         const data = saveValues(values);
    //         if (Object.keys(data).length === 0) {
    //           handleCloseModal();
    //           return;
    //         }
    //         await dispatch(updateThunk({ updateUser: data, token }));
    //         handleCloseModal();
    //       } catch {
    //         toast.error('Something went wrong');
    //       }
    //     },
    validationSchema: SettingModalSchema,
  });

  const saveValues = values => {
    let data = {};

    if (
      values.username.trim().length !== 0 &&
      values.username !== formik.initialValues.username
    ) {
      data = { ...data, username: values.username };
    }

    if (
      values.email.trim().length !== 0 &&
      values.email !== formik.initialValues.email
    ) {
      data = { ...data, email: values.email };
    }

    if (genderValue !== gender) {
      data = { ...data, gender: genderValue };
    }

    if (formik.values.oldPassword || formik.values.confirmPassword) {
      const password = {
        newPassword: formik.values.confirmPassword,
        oldPassword: formik.values.oldPassword,
      };
      data = { ...data, password };
    }

    return data;
  };

  const handleFileChange = async evt => {
    const avatar = evt.target.files[0];
    setImgSize(false);
    if (!avatar) {
      return;
    }

    const maxSizeInBytes = 3 * 1024 * 1024;
    if (avatar.size > maxSizeInBytes) {
      evt.target.value = null;
      setImgSize(true);
      return;
    }
  };
  //     const formData = new FormData();
  //     formData.append('avatar', avatar);
  //     setLoader(true);
  //     await dispatch(updateAvatarThunk({ avatar: formData, token }));
  //     setLoader(false);
  //   };

  const handleGenderChange = evt => {
    setGenderValue(evt.target.value);
  };

  const handleInputChange = evt => {
    formik.handleChange(evt);
  };

  const handleCloseModal = () => {
    closeModal();
    formik.resetForm();
    setImgSize(false);
  };

  const handleTogglePassword = field => {
    setShowPassword(prevShowPassword => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  const onBackdropeClick = evt => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };
  return (
    <StyledSettingModal
      contentLabel="Setting Modal"
      isOpen={settingModalIsOpen}
      onRequestClose={closeModal}
    >
      <StModalBackdrope onClick={onBackdropeClick}>
        <StModalWrap>
          <WrapHeader>
            <Title>Setting</Title>
            <BtnSvg
              className="cross-btn"
              type="button"
              onClick={handleCloseModal}
            >
              <Icon
                id="icon-close-x"
                width="14"
                height="14"
                style={{ stroke: '#407bff' }}
              />
            </BtnSvg>
          </WrapHeader>
          <form onSubmit={formik.handleSubmit}>
            <p>Your photo</p>
            <AvatarWrap>
              <ImgWrapper>
                {avatarURL ? (
                  <img alt={username || email} src={avatarURL} />
                ) : (
                  <Icon id="icon-user" />
                )}
              </ImgWrapper>
              <UploadLabel>
                <FileInput
                  //   disabled={isLoading}
                  name="avatarUrl"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <UploadButton>
                  <Icon
                    id="icon-arrow-up-tray"
                    width="16"
                    height="16"
                    style={{ stroke: '#407bff' }}
                  />
                  <p>Upload a photo</p>
                </UploadButton>
              </UploadLabel>
            </AvatarWrap>
            {imgSize ? (
              <MessageError>File size to large (3 MB)</MessageError>
            ) : null}
            <WrapInfo>
              <div>
                <p>Your gender identity</p>
                <StyledRadioGroup role="group" aria-labelledby="my-radio-group">
                  <StyledRadioLabel>
                    <StyledRadioInput
                      type="radio"
                      name="gender"
                      value="girl"
                      onChange={handleGenderChange}
                    />
                    <StyledRadioCircle>
                      <CircleColor
                        checked={genderValue === 'girl'}
                      ></CircleColor>
                    </StyledRadioCircle>
                    <StyledRadioText>Girl</StyledRadioText>
                  </StyledRadioLabel>
                  <StyledRadioLabel>
                    <StyledRadioInput
                      type="radio"
                      name="gender"
                      value="man"
                      onChange={handleGenderChange}
                    />
                    <StyledRadioCircle>
                      <CircleColor
                        checked={genderValue === 'man'}
                      ></CircleColor>
                    </StyledRadioCircle>
                    <StyledRadioText>Man</StyledRadioText>
                  </StyledRadioLabel>
                </StyledRadioGroup>
                <label>
                  <p>Your name</p>
                  <Input
                    name="username"
                    type="text"
                    placeholder={username}
                    onChange={handleInputChange}
                    $hasError={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <MessageError>{formik.errors.username}</MessageError>
                  ) : null}
                </label>
                <label>
                  <EmailText>E-mail</EmailText>
                  <Input
                    name="email"
                    type="email"
                    placeholder={email}
                    onChange={handleInputChange}
                    $hasError={formik.touched.email && formik.errors.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <MessageError>{formik.errors.email}</MessageError>
                  ) : null}
                </label>
              </div>
              <div>
                <PasswordTitle>Password</PasswordTitle>
                <Label>
                  <PasswordText>Outdated password:</PasswordText>
                  <InputPasswordWrap>
                    <InputPassword
                      name="oldPassword"
                      onChange={handleInputChange}
                      type={showPassword.oldPassword ? 'text' : 'password'}
                      placeholder="Password"
                      $hasError={
                        formik.touched.oldPassword && formik.errors.oldPassword
                      }
                    />
                    <ButtonEye
                      onClick={() => handleTogglePassword('oldPassword')}
                      type="button"
                    >
                      {showPassword.oldPassword ? (
                        <Icon
                          id="icon-eye"
                          width="16"
                          height="16"
                          style={{ stroke: '#407bff' }}
                        />
                      ) : (
                        <Icon
                          id="icon-eye-slash"
                          width="16"
                          height="16"
                          style={{ stroke: '#407bff' }}
                        />
                      )}
                    </ButtonEye>
                  </InputPasswordWrap>
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <MessageError>{formik.errors.oldPassword}</MessageError>
                  ) : null}
                </Label>
                <Label>
                  <PasswordText>New password:</PasswordText>
                  <InputPasswordWrap>
                    <InputPassword
                      name="newPassword"
                      onChange={handleInputChange}
                      type={showPassword.newPassword ? 'text' : 'password'}
                      placeholder="Password"
                      $hasError={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                    />
                    <ButtonEye
                      onClick={() => handleTogglePassword('newPassword')}
                      type="button"
                    >
                      {showPassword.newPassword ? (
                        <Icon
                          id="icon-eye"
                          width="16"
                          height="16"
                          style={{ stroke: '#407bff' }}
                        />
                      ) : (
                        <Icon
                          id="icon-eye-slash"
                          width="16"
                          height="16"
                          style={{ stroke: '#407bff' }}
                        />
                      )}
                    </ButtonEye>
                  </InputPasswordWrap>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <MessageError>{formik.errors.newPassword}</MessageError>
                  ) : null}
                </Label>
                <Label>
                  <PasswordText>Repeat new password:</PasswordText>
                  <InputPasswordWrap>
                    <InputPassword
                      name="confirmPassword"
                      onChange={handleInputChange}
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      placeholder="Password"
                      $hasError={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                    <ButtonEye
                      onClick={() => handleTogglePassword('confirmPassword')}
                      type="button"
                    >
                      {showPassword.confirmPassword ? (
                        <Icon
                          id="icon-eye"
                          width="16"
                          height="16"
                          style={{ stroke: '#407bff' }}
                        />
                      ) : (
                        <Icon
                          id="icon-eye-slash"
                          width="16"
                          height="16"
                          style={{ stroke: '#407bff' }}
                        />
                      )}
                    </ButtonEye>
                  </InputPasswordWrap>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <MessageError>{formik.errors.confirmPassword}</MessageError>
                  ) : null}
                </Label>
              </div>
            </WrapInfo>
            <Button type="submit">Save</Button>
          </form>
        </StModalWrap>
      </StModalBackdrope>
    </StyledSettingModal>
  );
};
