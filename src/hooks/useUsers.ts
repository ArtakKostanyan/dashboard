import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../types/user.ts';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchUsers = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/users`);

  return data;
};

export const useUsers = () => {
  return useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
