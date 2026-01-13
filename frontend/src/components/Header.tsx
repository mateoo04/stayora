import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import UserDrawer from "./UserDrawer";

export default function Header(){
    return <header className='flex justify-between px-4 py-2'>
        <Link to="/"><img src={Logo} className="w-48"/></Link>
  <UserDrawer/>
    </header>;
}