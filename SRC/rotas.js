const express = require('express');
const usuarios = require('./controladores/usuarios');
const pokemons = require('./controladores/pokemon');
const verificacaoToken = require('./util/verificarToken')
const rotas = express();

//usuarios
rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

//pokemons
rotas.use(verificacaoToken)
rotas.post('/pokemons', pokemons.cadastrar);
rotas.put('/pokemons/:id', pokemons.atualizarApelido);
rotas.get('/pokemons', pokemons.listar);
rotas.get('/pokemons/:id', pokemons.listarId);
rotas.delete('/pokemons/:id', pokemons.excluir);

module.exports = rotas;
