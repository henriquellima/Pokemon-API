const query = require('./conexao');
const { verify } = require('jsonwebtoken');
const secret = require('../util/secret');

const verificarToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json('Token não informado!');
  }

  const token = req.headers.authorization.replace('Bearer', '').trim();

  try {
    const { id } = verify(token, secret);

    const usuario = await query(
      'select email, nome, id from usuarios where id = $1',
      [id]
    );

    req.usuario = usuario.rows[0];

    next();

  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = verificarToken;
