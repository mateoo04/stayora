import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { RectangleStackIcon } from '@heroicons/react/24/outline'
import { BuildingOffice2Icon } from '@heroicons/react/24/outline'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { useState } from "react";

export default function ProfileDrawer() {    
  const navigate = useNavigate();
  const {isAuthenticated, user, isAdmin, isGuest, isHost, logOut} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`drawer drawer-end w-8 ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <label htmlFor="profile-drawer" onClick={()=> setIsOpen(true)} className="drawer-button cursor-pointer">
          <UserCircleIcon className="w-8" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="user-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        ></label>
        <div className="user-drawer__menu menu bg-base-200 min-h-full p-0 w-80 flex flex-col gap-2 items-start">
          {isAuthenticated ? (
            <><div className="flex gap-2 items-center px-4 py-2">
              {user && (<><UserCircleIcon className="w-12" />
              <p>{`${user.firstName} ${user.lastName}`}</p></>)}
              </div>
              <div className="flex flex-col gap-2 w-100">
                 <Link onClick={() => setIsOpen(false)} to={`/bookings`}><BuildingOffice2Icon className="w-5"/><span>My bookings</span></Link>
                {isHost() || isAdmin() && <Link onClick={() => setIsOpen(false)} to="/listings"><RectangleStackIcon className="w-5"/><span>My listings</span></Link>}
                {isAdmin() && <Link onClick={() => setIsOpen(false)} to="/admin/dashboard"><AdjustmentsHorizontalIcon className="w-5"/><span>Admin dashboard</span></Link>}
                {isGuest() && <Link onClick={() => setIsOpen(false)} to="/become-a-host"><UserGroupIcon className="w-5"/><span>Become a host</span></Link>}
              <button
                onClick={() => {
                  logOut();
                  navigate("/log-in");
                  setIsOpen(false);
                }}
              >
                <ArrowLeftEndOnRectangleIcon className="w-5"/><span>Log out</span>
              </button>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link to="/log-in">Log in</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign up</Link>
              </li>
            </>
          )}
        </div>
      </div>
    </div>
  );
}