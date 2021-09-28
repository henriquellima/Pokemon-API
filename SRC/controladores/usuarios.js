const query = require('../util/conexao');
const { criarHash , verificarHash} = require('../util/password');
const jwt = require('jsonwebtoken');
const secret = require('../util/secret')


const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome) {
    return res.status(400).json('Nome é obrigatorio');
  }
  if (!email) {
    return res.json(400).json('Email é obrigatório');
  }
  if (!senha) {
    return res.status(400).json('Senha é obrigatorio');
  }

  try {
    const procurarEmail = await query(
      'select * from usuarios where email = $1',
      [email]
    );
    if (procurarEmail.rowCount !== 0) {
      return res.status(400).json('Email já cadastrado');
    }

    const hashSenha = await criarHash(senha);

    const usuario = await query(
      'insert into usuarios (nome, email, senha) values ($1, $2, $3)',
      [nome, email, hashSenha]
    );

    if (usuario.rowCount === 0) {
      return res
        .status(400)
        .json({ messagem: 'Não foi possivel cadastrar o usuario' });
    }

    return res.status(200).json('Usuario cadastrado com sucesso!!!!');
  } catch (error) {
    return res.status(200).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!senha) {
    return res.status(400).json({ erro: 'Campo senha é obrigatorio' });
  }
  if (!email) {
    return res.status(400).json({ erro: 'Campo email é obrigatorio' });
  }
  try {
    //autenticaçao
    const usuario = await query(
      'select * from usuarios where email = $1',
      [email]
    );

    if (usuario.rowCount === 0) {
      return res.status(404).json({ erro: 'Email/senha incorreto' });
    }

    const hash = usuario.rows[0].senha;
    const autenticacao = await verificarHash(senha, hash);

    if (!autenticacao.status) {
      return res.status(400).json({ mensagem: 'Email/senha invalido' });
    }

    if (autenticacao.status) {
      const usuarioRow = usuario.rows[0];
      const token = await jwt.sign(
        {
          id: usuarioRow.id
        },
        secret
      );
      res.status(200).json({Mensagem: autenticacao.message, token})
    }

    if (autenticacao.atualizarHash) {
      const novoHash = await criarHash(senha);
      await query('update usuarios set senha = $1 where email = $2', [
        novoHash,
        email,
      ]);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  login
};
