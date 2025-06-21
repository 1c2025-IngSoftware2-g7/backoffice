// Local storage for Login data
const USER_DATA_FIELD = 'user';

export const saveUserLoginData = async (userData) => {
  try {
    localStorage.setItem(USER_DATA_FIELD, JSON.stringify(userData));
  } catch (err) {
    console.error('Failed to save user data', err);
    throw err;
  }
};


export const getUserLoginData = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_FIELD);
    return userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error('Failed to retrieve user data', err);
    return null;
  }
}

export const removeUserLoginData = () => {
  try {
    localStorage.removeItem(USER_DATA_FIELD);
  }
  catch (err) {
    console.error('Failed to remove user data', err);
  }
};