export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// export const getRole = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('role');
//   }
//   return null;
// };

// export const isAuthenticated = () => (getAccessToken() ? true : false);