import { useTranslation } from 'react-i18next';
import { USER_ROLES, type User, type UserRole } from '../types/user';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface RoleChangeModalProps {
  isOpen: boolean;
  currentRole: UserRole | undefined;
  onSave?: (newRole: UserRole | undefined) => Promise<void>;
  closeModal: () => void;
}

export function RoleChangeModal({
  isOpen,
  currentRole,
  onSave,
  closeModal
}: RoleChangeModalProps) {
  const { t } = useTranslation();

  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
    currentRole,
  );

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);

  return (
    <dialog id="admin-board__role-modal--overlay" onClick={(e) => {
    if (e.target === e.currentTarget) closeModal();
  }} className="modal" open={isOpen}>
      <div className="modal-box p-0 pt-4 z-2">
        <h3 className="font-bold text-lg px-4">
          {t('admin.role_dialog_title')}
        </h3>
        <button
          onClick={closeModal}
          className="cursor-pointer absolute right-2 top-2"
          aria-label="Close role change modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="modal-action w-full">
          <form method="dialog" className="flex flex-col w-full">
            {USER_ROLES.map((role) => (
              <label
                key={role}
                className={`cursor-pointer flex items-center gap-2 text-base-content border-t-1 border-neutral px-4 py-2 ${role === selectedRole ? 'bg-base-300 text-black' : ''}`}
              >
                <span>{role}</span>
                <input
                  key={role}
                  type="radio"
                  value={role}
                  checked={role === selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  style={{ display: 'none' }}
                />
              </label>
            ))}
            <button
              className="btn"
              onClick={() => {
                if (!onSave) return;
                onSave(selectedRole);
              }}
            >
              {t('admin.save')}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
