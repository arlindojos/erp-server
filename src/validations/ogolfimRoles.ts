
export default {
  validator(role: string) {
    if (!role || role.trim().length < 2 || role.trim().length > 100) {
      return false
    }

    if(
      role.match(/Desenvolvedor Fullstack - Javascript, Typescript E Node.js/) ||
      role.match(/Desenvolvedor Frontend - React.js/) ||
      role.match(/Graphic Designer - UI E UX/) ||
      role.match(/Desenvolvedor Backend - Node.js/)
    ) {
      return true
    }

    return false;
  },

  create(role: string) {
    if(!this.validator(role)) {
      const error = new Error(`The role ${role} is invalid.`);
      error.name = 'InvalidRoleError';

      return error;
    }


    return role;
  }
}
