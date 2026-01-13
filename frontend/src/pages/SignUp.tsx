import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(){
    const {signup, isAuthenticated, authErrorCode} = useAuth();

    const navigate = useNavigate();

    const { t } = useTranslation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    
      useEffect(() => {
        if (isAuthenticated) {
          navigate("/");
        }
      }, [isAuthenticated, navigate]);
    
      if (isAuthenticated) {
        return null;
      }

    function validateEmail(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password: string) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        setValidationError(null);

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setValidationError(t('auth.errors.validationError'));
            return;
        }
        if (!validateEmail(email)) {
            setValidationError(t('auth.errors.invalidEmail') || "Invalid email format.");
            return;
        }
        if (password !== confirmPassword) {
            setValidationError(t('auth.errors.passwordsDontMatch') || "Passwords do not match.");
            return;
        }
        if (!validatePassword(password)) {
            setValidationError(t('auth.errors.weakPassword'));
            return;
        }

         await signup({firstName, lastName, username: email, password});
         console.log(authErrorCode);
        if(isAuthenticated){
            navigate("/");
        }
    }

    return (
        <div className="sign-up__wrapper flex flex-col gap-2 items-center max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold">{t('auth.signup.title')}</h2>

        {validationError && (
            <p className="error-message">{validationError}</p>
        )}
        {authErrorCode === 'EMAIL_EXISTS' && (
            <p className="error-message">{t('auth.errors.emailExists')}</p>
        )}
        {authErrorCode === 'WEAK_PASSWORD' && (
            <p className="error-message">{t('auth.errors.weakPassword')}</p>
        )}
        {authErrorCode === 'VALIDATION_ERROR' && (
            <p className="error-message">{t('auth.errors.validationError')}</p>
        )}
        <form onSubmit={handleSubmit} className="sign-up__form flex flex-col gap-2 w-full">
                <input
                    type="text"
                    id="firstName"
                    className="input"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    placeholder={t('auth.signup.firstName')}
                    />
                <input
                    type="text"
                    id="lastName"
                    className="input"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    placeholder={t('auth.signup.lastName')}
                    />
                <input
                    type="email"
                    id="email"
                    className="input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder={t('auth.login.email')}
                    />
                <input
                    type="password"
                    id="password"
                    className="input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder={t('auth.login.password')}
                    />
                <input
                    className="input"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder={t('auth.signup.confirmPassword')}
                    />
</form>
<button type="submit" className="btn btn-primary btn--big mt-2" onClick={handleSubmit}>{t('auth.signup.submit')}</button>
<p className="mt-2">{t('auth.signup.haveAccount')}<Link to="/log-in" className="link-secondary link-hover">{t('auth.signup.loginLink')}</Link></p>
        </div>
    )
}