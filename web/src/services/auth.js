// export const TOKEN_KEY = "WinterIsComingGOT2019";
// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const getToken = () => localStorage.getItem(TOKEN_KEY);
// export const login = token => {
//   localStorage.setItem(TOKEN_KEY, token);
// };
// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };

// return the user data from the session storage
export const getUser = () => {
  const dev = localStorage.getItem('dev');
  if (dev) return JSON.parse(dev);
  else return null;
}

export const getUserUpdate = () => {
  const dev = localStorage.getItem('dev');
  if (dev) return JSON.parse(dev);
  else return null;
}
 
// export const getDevProf = () => {
//   const dev = localStorage.getItem('dev');
//   if (dev) return JSON.parse(dev);
//   else return null;
// }

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('dev');
}

// create a session storage for a user
export const setUserSession = (token, dev) => {
  localStorage.setItem('token', token);
  localStorage.setItem('dev', JSON.stringify(dev));
}




// export default setTimeout(function() {
//   let token = localStorage.setItem('authToken');
//   }, 50);

// export default  setTimeout(function() {
//   let token = localStorage.getItem('authToken');
//   }, 50);


//   await AsyncStorage.getItem('loginStatus')
// .then(value => this.setState({ loginStatus: value }))
// .catch(e => console.log('err', e));