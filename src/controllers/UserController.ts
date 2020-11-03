import User from '@models/User';

class UserController {
  teste = () => {
    const user = new User();
    user.name = 'Josivaldo';
  }
}

export default UserController;
