import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header(){
    const navigate = useNavigate();
    const {isAuthenticated, logOut} = useAuth();
    return <header>Stayora
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
                {isAuthenticated ? (
                    <li><button onClick={() => {logOut(); navigate('/log-in')}}>Log out</button></li>
                ) : (<><li><a href="/log-in">Log in</a></li>
                <li><a href="/sign-up">Sign up</a></li></>)}
        </ul>
    </header>;
}