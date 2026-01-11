import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <div className="login__wrapper">
        <h2>{t('auth.signup.title')}</h2>

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
        <form onSubmit={handleSubmit} className="login__form">
            <div className="form__group">
                <label htmlFor="email">{t('auth.signup.firstName')}</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    />
        </div>
            <div className="form__group">
                <label htmlFor="email">{t('auth.signup.lastName')}</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    />
        </div>
            <div className="form__group">
                <label htmlFor="email">{t('auth.login.email')}</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
        </div>
            <div className="form__group">
                <label htmlFor="password">{t('auth.login.password')}</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    />
        </div>
            <div className="form__group">
                <label htmlFor="password">{t('auth.signup.confirmPassword')}</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    />
        </div>
</form>
<button type="submit" onClick={handleSubmit}>{t('auth.signup.submit')}</button>
<p>{t('auth.signup.haveAccount')}<a href="/log-in">{t('auth.signup.loginLink')}</a></p>
        </div>
    )
}