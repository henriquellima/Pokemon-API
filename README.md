

# Pokemon-API #
This aplication have two tables: users and pokemons. Each user will have its own list of pokemon.


# At users you can:

- Register - your password is totaly safe because this app only saves the encrypted version of it
  this function requires this JSON body:
  {
	"nome": "user_name",
	"email": "user_email@",
	"senha": "user_password***"
  }
  
- Login - which gives you a token and you will need it to make changes in your pokemon list -
 this function requires this JSON body:
  {
  "email": "user_email@",
  "senha": "user_password**"
  }
  
  
# At pokemons you can: 
## You need to pass your token in the baerer authentication ##

- Register -
  this function requires this JSON body:
 {
 "nome": "pokemon_name",
 "habilidades": "pokemon_abillities",
 "imagem": "pokemon_img_link" optional*,
  "apelido": "pokemon_nickname" optional
 }

- List -
    this function doesn't require a body.

- List by ID -
    this function requires a pokemon_id in parameters.

 - Update Nickname -
    this function requires a pokemon_id in parameters and JSON body:
    {
    "apelido": "new_nickname"
    }
 
 - Delete Pokemon -
  this function requires a pokemon_id in parameters.
   
    
