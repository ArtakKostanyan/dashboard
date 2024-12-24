import { useCreateUser } from '../../hooks/useCreateUser.ts';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ROUTES } from '../../routes';
import { useForm } from '@tanstack/react-form';
import { useUsers } from '../../hooks/useUsers.ts';
import { useMemo } from 'react';
import { IUser } from '../../types/user.ts';
import { useUpdateUser } from '../../hooks/useUpdateUser.ts';
import { formSchema } from './validationSchema.ts';

type IUserAddEditProps = {
    isNew: boolean;
};

const defaultData = {
    name: 'Jon',
    username: 'Done',
    url:
        'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    about: 'about',
};

interface FormProp {
    username: string;
    name: string;
    url: string;
    about: string;
}

const UserAddEdit = ({ isNew }: IUserAddEditProps) => {
    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
     const navigate = useNavigate();
    const { userId } = useParams({ strict: false });
    const { data: users, isLoading } = useUsers();
    const currentUser = useMemo<IUser | null>(() => {
        if (users && users.length === 0) return null;
        return users?.find((user) => user.id == userId) || null;
    }, [users, userId]);

    const form = useForm<FormProp>({
        defaultValues: currentUser || defaultData,
        onSubmit: async ({ value }) => {
            if (value?.name && value?.username && value?.url && value?.about) {
                if (isNew) {
                    const newUserId = String(new Date().getTime());
                    createUserMutation.mutate(
                        { ...value, id: newUserId },
                        {
                            onSuccess: () => {
                                navigate({ to: ROUTES.User.replace(newUserId) });
                            },
                            onError: (error) => {
                                console.error('Error:', error);
                            },
                        }
                    );
                } else if (currentUser) {
                    updateUserMutation.mutate(
                        { ...value, id: currentUser.id },
                        {
                            onSuccess: () => {
                                navigate({ to: ROUTES.User.replace(currentUser.id) });
                            },
                            onError: (error) => {
                                console.error('Error:', error);
                            },
                        }
                    );
                }
            }
        },
        validators: {
            onChange: formSchema,
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Add New User</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                <div>
                    <form.Field
                        name="name"
                        children={(field) => {
                            return (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            );
                        }}
                    />
                </div>
                <div>
                    <form.Field
                        name="username"
                        children={(field) => {
                            return (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            );
                        }}
                    />
                </div>
                <div>
                    <form.Field
                        name="about"
                        children={(field) => {
                            return (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        About
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            );
                        }}
                    />
                </div>
                <div>
                    <form.Field
                        name="url"
                        children={(field) => {
                            return (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Photo URL
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            );
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-700 text-white rounded-md"
                >
                    {isNew ? 'Add User' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default UserAddEdit;
