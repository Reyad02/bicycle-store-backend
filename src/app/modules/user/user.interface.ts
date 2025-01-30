interface IUser {
  name: string;
  email: string;
  password: string;
  userType: 'Customer' | 'Admin';
  profileImg?: string;
}

export default IUser;
