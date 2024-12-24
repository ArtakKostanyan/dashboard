import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../types/user.ts';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createUser = async (newUser: IUser) => {
  const { data } = await axios.post(`${API_BASE_URL}/users`, newUser);
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
