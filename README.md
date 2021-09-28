# Pokemon-API #
This aplication have two tables: users and pokemons. Each user will have you only list of pokemon.


# At users you can:
- Register, your password is totaly safe why this app save only the encrypted version of it -
  this function requires this JSON body:
  {
	"nome": "user_name",
	"email": "user_email@"
	"senha": "user_password***"
  }
  ----------------
- Login, what gives you a token, you will need it to do changes in your pokemon list -
 this function requires this JSON body:
  {
  "email": "user_email@"
	"senha": "user_password**",
  }
  ----------------
  
  
# At pokemons you can: ##(you need to pass your token in the baerer authentication)##
- Register -
  this function requires this JSON body:
 {
	"nome": "pokemon_name",
	"habilidades": "pokemon_abillities",
	"imagem": "pokemon_img_link" optional*,
  "apelido": "pokemon_nickname" optional
 }

 - List -
    this function doesn't require body.

 - List by ID -
    this function requires a pokemon_id in params.

 - Updade Nickname -
    this function requires a pokemon_id in params and JSON body:
    {
    "apelido": "new_nickname"
    }
 
 - Delete Pokemon -
  this function requires a pokemon_id in params.
   
    
