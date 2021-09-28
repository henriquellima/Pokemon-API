const query = require('../util/conexao');
const jwt = require('jsonwebtoken');
const secret = require('../util/secret');

const listar = async (req, res) => {
  try {
    const {id: usuario_id} = req.usuario;

    const pokemons = await query(
      `SELECT p.id, u.nome AS usuario, p.nome, p.apelido, p.habilidades, p.imagem 
      FROM pokemons p 
      JOIN usuarios u 
      ON p.usuario_id = u.id
      WHERE p.usuario_id = $1`,
      [usuario_id]
    );
    const pokemonsRows = pokemons.rows;

    return res.status(200).json(pokemonsRows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarId = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario_id = req.usuario.id;

    const pokemon = await query(
      `SELECT p.id, u.nome AS usuario, p.nome, p.apelido, p.habilidades, p.imagem 
      FROM pokemons p 
      JOIN usuarios u 
      ON p.usuario_id = u.id
      WHERE p.id = $1 and 
      p.usuario_id = $2`,
      [id, usuario_id]
    );

    if (pokemon.rowCount === 0) {
      return res.status(404).json('Pokemon não encontrado');
    }

    return res.status(200).json(pokemon.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrar = async (req, res) => {
  const { nome, habilidades, imagem, apelido } = req.body;

  if (!nome) return res.status(400).json('O campo nome é obrigatório.');
  if (!habilidades)
    return res.status(400).json('O campo habilidades é obrigatório.');

  try {
    const usuario_id = req.usuario.id;

    const pokemon = await query(
      `INSERT INTO pokemons
      (usuario_id, nome, habilidades, imagem, apelido)
      VALUES ($1, $2, $3, $4, $5)`,
      [usuario_id, nome, habilidades, imagem, apelido]
    );

    if (pokemon.rowCount === 0) {
      return res.status(400).json(`Não foi possivel cadastrar o pokemon`);
    }
    return res.status(200).json(`Pokemon cadastrado com sucesso.`);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarApelido = async (req, res) => {
  const { id } = req.params;
  const { apelido, token } = req.body;

  if (!apelido) return res.status(400).json('O campo apelido é obrigatório.');

  try {
    const usuario_id = req.usuario.id;

    const pokemon = await query(
      'SELECT * FROM pokemons WHERE id = $1 and usuario_id = $2',
      [id, usuario_id]
    );

    console.log(pokemon.rows);
    if (pokemon.rowCount === 0)
      return res.status(400).json('Pokemon não encontrado');

    const pokemonAtualizado = await query(
      `UPDATE pokemons SET apelido = $1 WHERE id = $2 and usuario_id = $3`,
      [apelido, id, usuario_id]
    );

    if (pokemonAtualizado.rowCount === 0)
      return res(404).json('Não foi possível atualizar o pokemon');

    return res
      .status(200)
      .json('Apelido do Pokemon foi atualizado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluir = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario_id = req.usuario.id;

    const pokemon = await query(
      'SELECT * FROM pokemons WHERE id = $1 and usuario_id = $2',
      [id, usuario_id]
    );
    if (pokemon.rowCount === 0)
      return res.status(404).json('Pokemon não encontrado');

    const pokemonExcluido = await query(
      'DELETE FROM pokemons WHERE id = $1 and usuario_id = $2',
      [id, usuario_id]
    );

    if (pokemonExcluido.rowCount === 0)
      return res.status.json('Não foi possível excluir o pokemon');

    return res.status(200).json('Pokemon foi excluido com sucesso');
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  listar,
  listarId,
  atualizarApelido,
  excluir,
  cadastrar,
};
