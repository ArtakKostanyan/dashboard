import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import './styles.css';
import { useUsers } from '../../hooks/useUsers.ts';
import { IUser } from '../../types/user.ts';
import { ROUTES } from '../../routes';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading } = useUsers();

  const filteredUsers = useMemo<IUser[]>(() => {
    if (!users) return [];
    return users.filter((user: IUser) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="h-screen p-4 bg-gray-100 border-r border-gray-300">
        {/* Search bar and New button */}
        <div className="mb-4 flex items-center gap-2">
          <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
              to={ROUTES.CreateUser.path}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            New
          </Link>
        </div>

        {/* User list */}
        <ul className="flex-1 space-y-2 overflow-y-auto">
          {filteredUsers.map((user) => (
              <li key={user.id}>
                <Link
                    to={ROUTES.User.replace(user.id)}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600"
                >
                  <span className="truncate">{user.name}</span>
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;
