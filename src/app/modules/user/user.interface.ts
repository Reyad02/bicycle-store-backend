interface IUser {
  name: string;
  email: string;
  password: string;
  userType: 'Customer' | 'Admin';
  profileImg?: string;
  accountStatus: boolean;
}

export default IUser;
