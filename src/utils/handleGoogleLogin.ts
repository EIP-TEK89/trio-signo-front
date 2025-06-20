import { API_ROUTES, API_URL } from '$constants/routes';

export const handleGoogleLogin = () => {
    window.location.href = API_ROUTES.googleAuth;
};