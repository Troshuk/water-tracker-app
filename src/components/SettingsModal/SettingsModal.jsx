import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { ContentLoader, Icon } from 'components';

import {
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
  UploadLabelWrap,
} from './SettingsModal.styled.js';
import {
  updateAvatarSelector,
  updateUserSelector,
  userSelector,
  deleteAvatarSelector,
} from 'store/selectors';

import { SettingModalSchema } from 'schemasValdiate/SettingModalSchema.jsx';
import { deleteAvatar, updateAvatar, updateUser } from 'store/operations.js';
import { notify, notifyApi } from 'notify.js';

export const SettingsModal = ({ settingModalIsOpen, closeModal }) => {
  const { avatarURL, gender, name, email } = useSelector(userSelector);
  const { isLoading: isUpdatingUser } = useSelector(updateUserSelector);
  const { isLoading: isUpdatingAvatar } = useSelector(updateAvatarSelector);
  const { isLoading: isDeletingAvatar } = useSelector(deleteAvatarSelector);

  const [imgSize, setImgSize] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name,
      email,
      gender,
      avatarURL,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    onSubmit: async values => {
      const data = saveValues(values);

      if (Object.keys(data).length === 0) {
        notify('You have not cahnged anything');
        return;
      }

      notifyApi(dispatch(updateUser(data)).unwrap(), 'Saving your user', true);
    },
    validationSchema: SettingModalSchema,
  });

  const saveValues = values => {
    let data = {};

    if (values.name !== name) {
      data.name = values.name || null;
    }

    if (values.email !== email) {
      data.email = values.email;
    }

    if (gender !== values.gender) {
      data.gender = values.gender;
    }

    if (values.oldPassword || values.confirmPassword) {
      data.password = values.confirmPassword;
      data.old_password = values.oldPassword;
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

    const formData = new FormData();
    formData.append('avatar', avatar);

    notifyApi(
      dispatch(updateAvatar(formData)).unwrap(),
      'Updating your photo',
      true
    );
  };

  const handleInputChange = evt => {
    formik.handleChange(evt);
  };

  const handleCloseModal = () => {
    closeModal();
    formik.resetForm();
    setImgSize(false);
  };

  const handleDeleteAvatar = () => {
    notifyApi(dispatch(deleteAvatar()).unwrap(), 'Deleting your photo', true);
  };

  const handleTogglePassword = field => {
    setShowPassword(prevShowPassword => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  return (
    <StyledSettingModal
      contentLabel="Setting Modal"
      isOpen={settingModalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <StModalWrap>
        <WrapHeader>
          <Title>Setting</Title>
          <BtnSvg type="button" onClick={handleCloseModal}>
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
                <img alt="User's avatar" src={avatarURL} />
              ) : (
                (name || email || '').charAt(0).toUpperCase()
              )}
            </ImgWrapper>
            <UploadLabelWrap>
              <UploadLabel>
                <FileInput
                  disabled={
                    isUpdatingAvatar || isDeletingAvatar || isUpdatingUser
                  }
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
                    className="upload-icon"
                  />
                  <p>
                    Upload new photo {isUpdatingAvatar && <ContentLoader />}
                  </p>
                </UploadButton>
              </UploadLabel>
              {avatarURL && (
                <UploadLabel>
                  <UploadButton onClick={handleDeleteAvatar}>
                    <Icon
                      id="icon-close-x"
                      width="16"
                      height="16"
                      className="upload-icon"
                    />
                    <p>
                      Delete this photo {isDeletingAvatar && <ContentLoader />}
                    </p>
                  </UploadButton>
                </UploadLabel>
              )}
            </UploadLabelWrap>
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
                    value="woman"
                    onChange={handleInputChange}
                  />
                  <StyledRadioCircle>
                    <CircleColor
                      checked={formik.values.gender === 'woman'}
                    ></CircleColor>
                  </StyledRadioCircle>
                  <StyledRadioText>Woman</StyledRadioText>
                </StyledRadioLabel>
                <StyledRadioLabel>
                  <StyledRadioInput
                    type="radio"
                    name="gender"
                    value="man"
                    onChange={handleInputChange}
                  />
                  <StyledRadioCircle>
                    <CircleColor
                      checked={formik.values.gender === 'man'}
                    ></CircleColor>
                  </StyledRadioCircle>
                  <StyledRadioText>Man</StyledRadioText>
                </StyledRadioLabel>
              </StyledRadioGroup>
              <label>
                <p>Your name</p>
                <Input
                  name="name"
                  type="text"
                  defaultValue={formik.values.name}
                  placeholder="Your name"
                  onChange={handleInputChange}
                  $hasError={formik.touched.name && formik.errors.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <MessageError>{formik.errors.name}</MessageError>
                ) : null}
              </label>
              <label>
                <EmailText>E-mail</EmailText>
                <Input
                  name="email"
                  type="email"
                  defaultValue={formik.values.email}
                  placeholder="Your email"
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
                    autoComplete="true"
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
                    autoComplete="true"
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
                    autoComplete="true"
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
          <Button
            type="submit"
            disabled={isUpdatingAvatar || isDeletingAvatar || isUpdatingUser}
          >
            Save {isUpdatingUser && <ContentLoader />}
          </Button>
        </form>
      </StModalWrap>
    </StyledSettingModal>
  );
};
