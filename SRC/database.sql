create database pokemon_token;

create table usuarios(
    id serial primary key,
    nome text,
    email text,
    senha text
)

create table pokemons(
    id serial primary key,
    usuario_id text,
    nome text,
    habilidados text,
    imagem text,
    apelido text
)