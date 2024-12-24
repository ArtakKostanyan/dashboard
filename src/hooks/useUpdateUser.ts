import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../types/user.ts';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const updateUser = async (user: IUser) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/users/${user.id}`,
    user
  );

  return data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
