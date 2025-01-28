interface IUser {
  name: string;
  email: string;
  password: string;
  userType: 'Customer' | 'Admin';
}

export default IUser;
