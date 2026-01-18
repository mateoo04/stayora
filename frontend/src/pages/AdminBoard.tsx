import { useEffect, useState } from "react";
import type { User, UserRole } from "../types/user";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { apiSearchUsers } from "../api/admin";
import { RoleChangeModal } from "../components/RoleChangeModal";

export function AdminBoard() {
  const { t } = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
        try {
            const response = await apiSearchUsers({ query, role, page, size });
            setUsers(response.data.content);
            setTotalPages(response.data.meta.totalPages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    }
    fetchUsers();
  }, [query, role, page, size]);

  return (
    <div className="admin-board">
      <div className="admin-board__users">
        <RoleChangeModal isOpen={roleModalOpen} defaultRole={selectedUser?.role} />
        <div className="admin-board__users-header">
          <h1>Admin Board</h1>
          <div className="admin-board__users-filters">
            <label className="input">
              <MagnifyingGlassIcon className="w-5" />
              <input
                type="search"
                required
                placeholder={t("admin.search")}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="admin-board__users-list">
          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="list">
                {users.map((user) => (
                    <li key={user.id} className="list-row">
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                        <button className="btn" onClick={()=>{
                          setRoleModalOpen(true);
                          setSelectedUser(user);
                        }}>Update role</button>
                        </li>
                        ))}
            </ul>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
