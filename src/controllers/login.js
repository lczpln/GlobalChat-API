const User = require('../models/User');

module.exports = {
  async Login(req, res, next) {
    const name = req.body.name;
    const password = req.body.password;

    try {
      const response = await User.findOne({ name, password });

      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).send({ msg: `Erro ao realizar login => ${e}` });
    }
  }
}