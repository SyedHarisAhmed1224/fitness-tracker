const { User } = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
  static async registerUser(userData) {
    try {
      const { name, email, password, security } = userData;

      /* if (!name || !email || !password || !security) {
        throw new Error('All fields are required');
      }
 */
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        security,
        createdAt: new Date(),       // <-- manually set
        updatedAt: new Date()
      });


      return newUser;
    } catch (error) {
      throw new Error(error.message || 'Error creating user');
    }
  }

  static async getUserData({ name, email }) {
    return await User.findOne({ where: { name, email } });
  }

  static async getUserName({ _id }) {
    return await User.findByPk(_id);
  }

  static async updatePassword(_id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await User.update(
      { password: hashedPassword },
      { where: { id: _id } }
    );
  }

  static async updateName(email, newName) {
    return await User.update(
      { name: newName },
      { where: { email } }
    );
  }

  static async checkUser(email) {
    return await User.findOne({ where: { email } });
  }

  static async checkUserbyid(_id) {
    return await User.findByPk(_id);
  }

  static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
    return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }

  static async deleteUserData(_id) {
    return await User.destroy({ where: { id: _id } });
  }
}

module.exports = UserService;
