import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  name: z.string().min(1, 'Name is required'),
  url: z.string().min(1, 'Photo URL is required'),
  about: z.string().min(1, 'About is required'),
});
