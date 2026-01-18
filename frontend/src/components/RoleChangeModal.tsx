import { useTranslation } from "react-i18next";
import { USER_ROLES, type User, type UserRole } from "../types/user";

interface RoleChangeModalProps {
  isOpen: boolean;
  defaultRole: UserRole | undefined;
} 

export function RoleChangeModal({isOpen, defaultRole}: RoleChangeModalProps) {
  const {t} = useTranslation();

  return (
<dialog id="admin-board__role-modal" className="modal" open={isOpen}>
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {USER_ROLES.map((role) => (
          <label key={role} className="flex items-center gap-2">
            <span>{role}</span>
          <input
            key={role}
            type="radio"
            value={role}
            checked={role === defaultRole} /></label>
        ))}
        <button className="btn">{t('admin.save')}</button>
      </form>
    </div>
  </div>
</dialog>
  );
}