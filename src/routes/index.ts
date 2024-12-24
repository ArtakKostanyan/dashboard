export const ROUTES = {
  Dashboard: { path: '/' },
  User: {
    path: '/user/$userId',
    replace: (userId: string) =>
      replacePath(ROUTES.User.path, '$userId', userId),
  },
  CreateUser: { path: '/user/create' },
  EditUser: {
    path: '/user/$userId/edit',
    replace: (userId: string) =>
      replacePath(ROUTES.EditUser.path, '$userId', userId),
  },
};

export const replacePath = (path: string, key: string, userId: string) => {
  return path.replace(key, userId);
};
