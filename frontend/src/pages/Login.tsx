import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const {login, isAuthenticated, authErrorCode} = useAuth();
    
    const navigate = useNavigate();

    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
        const [validationError, setValidationError] = useState<string | null>(null);
        const [isLoading, setIsLoading] = useState(false);

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
        setValidationError(null);

        if (!email || !password) {
            setValidationError(t('auth.errors.validationError'));
            return;
        }
        if (!validateEmail(email)) {
            setValidationError(t('auth.errors.invalidEmail') || "Invalid email format.");
            return;
        }
        setIsLoading(true);
        await login({username: email, password});
        setIsLoading(false);
        if(isAuthenticated){
            navigate("/");
        }
    }

    return (
        <div className="login__wrapper flex flex-col gap-2 items-center max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold">{t('auth.login.title')}</h2>
        {validationError && (
            <p className="error-message">{validationError}</p>
        )}{authErrorCode === 'INVALID_CREDENTIALS' && (
            <p className="error-message">{t('auth.errors.invalidLoginData')}</p>
        )}
        <form onSubmit={handleSubmit} className="login__form flex flex-col gap-2 w-full">
                <input
                    type="email"
                    id="email"
                    className="input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder={t('auth.login.email')}
                    />
                <input
                    type="password"
                    id="password"
                    className="input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="password"
                    placeholder={t('auth.login.password')}
                    />
</form>
<button type="submit" className="btn btn-primary btn--big mt-2" onClick={handleSubmit}>
  {isLoading && <span className="loading loading-spinner"></span>}{t('auth.login.submit')}</button>
<p className="mt-2">{t('auth.login.dontHaveAccount')}<Link to="/sign-up" className="link-secondary link-hover">{t('auth.login.signUpLink')}</Link></p>
        </div>
    )
}