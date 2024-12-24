import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useMemo, useState, useCallback } from 'react';
import { useUsers } from '../../hooks/useUsers.ts';
import { useDeleteUser } from '../../hooks/useDeleteUser.ts';
import { ROUTES } from '../../routes';
import ConfirmationModal from '../../components/ConfirmationModal';

const PLACEHOLDER_IMAGE = '/placeholder.jpg';
const CONFIRMATION_MESSAGE = 'Are you sure you want to delete this user?';

const Users = () => {
    const { userId } = useParams({ strict: false });
    const { data: users, isLoading } = useUsers();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const deleteUserMutation = useDeleteUser();
    const navigate = useNavigate();

    const currentUser = useMemo(() => {
        return users?.find((user) => user.id === userId) || null;
    }, [users, userId]);

    const openDeleteConfirmation = useCallback(() => {
        setIsConfirmationModalOpen(true);
    }, []);

    const handleDeleteUser = useCallback(() => {
        setIsConfirmationModalOpen(false);

        if (currentUser) {
            deleteUserMutation.mutate(currentUser, {
                onSuccess: () => {
                    navigate({ to: ROUTES.Dashboard.path });
                },
                onError: (error) => {
                    alert('Failed to delete the user. Please try again.');
                    console.error('Error:', error);
                },
            });
        }
    }, [currentUser, deleteUserMutation, navigate]);

    if (isLoading) {
        return <div className="text-center mt-6 text-blue-500">Loading...</div>;
    }

    if (!currentUser) {
        return <div className="text-center mt-6 text-gray-500">User not found</div>;
    }

    return (
        <div className="h-full p-6 text-gray-900">
            {isConfirmationModalOpen && (<ConfirmationModal
                onCancel={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleDeleteUser}
                message={CONFIRMATION_MESSAGE}
            />)}
            <div className="flex space-x-6 mb-6">
                <img
                    src={currentUser.url || PLACEHOLDER_IMAGE}
                    alt={currentUser.name || 'Default Img'}
                    className="object-cover shadow-lg border border-gray-300 rounded-md"
                    width="200"
                    height="200"
                />
                <div>
                    <h1 className="text-2xl font-semibold text-blue-700 hover:text-blue-800 transition duration-300">
                        {currentUser.name || 'User name'}
                    </h1>
                    <p className="text-sm text-gray-600">@{currentUser.username}</p>
                    <p className="text-sm text-gray-500">{currentUser.about || 'About'}</p>
                </div>
            </div>
            <div className="flex space-x-3">
                <Link
                    to={ROUTES.EditUser.replace(userId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Edit
                </Link>
                <button
                    onClick={openDeleteConfirmation}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Users;
