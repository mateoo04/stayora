import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const {login, isAuthenticated, authErrorCode} = useAuth();
    
    const navigate = useNavigate();

    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        setValidationError(undefined);

        if (!email || !password) {
            setValidationError(t('auth.errors.validationError'));
            return;
        }
        if (!validateEmail(email)) {
            setValidationError(t('auth.errors.invalidEmail') || "Invalid email format.");
            return;
        }
        await login({username: email, password});
        if(isAuthenticated){
            navigate("/");
        }
    }

    return (
        <div className="login__wrapper">
        <h2>{t('auth.login.title')}</h2>
        {validationError && (
            <p className="error-message">{validationError}</p>
        )}{authErrorCode === 'INVALID_CREDENTIALS' && (
            <p className="error-message">{t('auth.errors.invalidLoginData')}</p>
        )}
        <form onSubmit={handleSubmit} className="login__form">
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
</form>
<button type="submit" onClick={handleSubmit}>{t('auth.login.submit')}</button>
<p>{t('auth.login.dontHaveAccount')}<a href="/sign-up">{t('auth.login.signUpLink')}</a></p>
        </div>
    )
}