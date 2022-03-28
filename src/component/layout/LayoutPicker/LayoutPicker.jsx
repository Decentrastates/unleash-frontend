import ConditionallyRender from 'component/common/ConditionallyRender';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '../MainLayout/MainLayout';

const LayoutPicker = ({ children }) => {
    const location = useLocation();
    const standalonePages = () => {
        const { pathname } = location;
        const isLoginPage = matchPath(pathname, { path: '/login' });
        const isNewUserPage = matchPath(pathname, {
            path: '/new-user',
        });
        const isChangePasswordPage = matchPath(pathname, {
            path: '/reset-password',
        });
        const isResetPasswordSuccessPage = matchPath(pathname, {
            path: '/reset-password-success',
        });
        const isForgottenPasswordPage = matchPath(pathname, {
            path: '/forgotten-password',
        });
        const isSplashPage = matchPath(pathname, {
            path: '/splash/:id',
        });

        const is404 = matchPath(pathname, { path: '/404' });

        return (
            isLoginPage ||
            isNewUserPage ||
            isChangePasswordPage ||
            isResetPasswordSuccessPage ||
            isForgottenPasswordPage ||
            isSplashPage ||
            is404
        );
    };

    return (
        <ConditionallyRender
            condition={standalonePages()}
            show={children}
            elseShow={<MainLayout location={location}>{children}</MainLayout>}
        />
    );
};

export default LayoutPicker;
