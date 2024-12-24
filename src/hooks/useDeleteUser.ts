import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../types/user.ts';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deleteUser = async (user: IUser) => {
  const { data } = await axios.delete(`${API_BASE_URL}/users/${user.id}`);

  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
