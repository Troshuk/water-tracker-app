import { ToastContainer } from 'react-toastify';
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageLoader, NavigationBar } from 'components';

import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGN_UP_ROUTE,
  DASHBOARD_ROUTE,
  UPDATE_PASSWORD_PAGE,
  VERIFY_ROUTE,
  RESEND_EMAIL
} from 'routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AuthReducerSelector, fetchUserSelector } from 'store/selectors';
import { fetchUser } from 'store/operations';
import { notify } from 'notify';

const HomePage = lazy(() => import('pages/Home'));
const LoginPage = lazy(() => import('pages/Login'));
const RegisterPage = lazy(() => import('pages/Register'));
const ForgotPasswordPage = lazy(() => import('pages/ForgotPasswordPage'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const UpdatePasswordPage = lazy(() => import('pages/UpdatePasswordPage'));
const VerifyPage = lazy(() => import('pages/VerifyPage'));
const ResendEmail = lazy(() => import('pages/ResendEmail'));

export const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector(AuthReducerSelector);
  const { isLoading } = useSelector(fetchUserSelector);

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(fetchUser())
        .unwrap()
        .catch(() =>
          notify('Session has expired, please authenticate', 'error')
        );
    }
  }, [dispatch, isLoggedIn, token]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <>
      <NavigationBar />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {isLoggedIn || token ? (
              <>
                <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
                <Route path="*" element={<Navigate to={DASHBOARD_ROUTE} />} />
              </>
            ) : (
              <>
                <Route path={HOME_ROUTE} element={<HomePage />} />
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={SIGN_UP_ROUTE} element={<RegisterPage />} />
                <Route
                  path={FORGOT_PASSWORD_ROUTE}
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path={UPDATE_PASSWORD_PAGE}
                  element={<UpdatePasswordPage />}
                />
                <Route path={VERIFY_ROUTE} element={<VerifyPage />} />
                <Route path={RESEND_EMAIL} element={<ResendEmail />} />
              </>
            )}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          </Routes>
        </Suspense>
      </main>
      <ToastContainer />
    </>
  );
};
