import { useEffect, useState } from 'react';
import type { User, UserRole } from '../../../types/user';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { apiChangeUserRole, apiSearchUsers } from '../../../api/admin';
import { RoleChangeModal } from '../../../components/RoleChangeModal';

export function UsersTab() {
  const { t } = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await apiSearchUsers({ query, role, page, size });
      setUsers(response.data.content);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [query, role, page, size]);

  async function requestRoleChange(newRole: UserRole | undefined) {
    if (!selectedUser || !newRole) return;
    setRoleModalOpen(false);
    await apiChangeUserRole({ id: selectedUser!.id, role: newRole });
    fetchUsers();
  }

  return (
    <div className="admin-board__users">
      {loading && <span className="loading loading-spinner loading-xl absolute left-1/2 top-1/2 -translate-1/2"></span>}
      <div className="admin-board__users-inner">
        <RoleChangeModal
          isOpen={roleModalOpen}
          currentRole={selectedUser?.role}
          onSave={requestRoleChange}
          closeModal={() => setRoleModalOpen(false)}
        />
        <div className="admin-board__users-header">
          <div className="admin-board__users-filters">
            <label className="input">
              <MagnifyingGlassIcon className="w-5" />
              <input
                type="search"
                id='search'
                name='search'
                required
                placeholder={t('admin.search')}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="admin-board__users-list">
          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>{t('admin.no_users_found')}</p>
          ) : (
            <ul className="list">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="list-row flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <p>
                      <strong>
                        {user.firstName} {user.lastName}
                      </strong>
                    </p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                  </div>
                  <button
                    className="btn"
                    onClick={() => {
                      setRoleModalOpen(true);
                      setSelectedUser(user);
                    }}
                  >
                    {t('admin.change_role')}
                  </button>
                </li>
              ))}
            </ul>
          )}{' '}
        </div>
      </div>
    </div>
  );
}
