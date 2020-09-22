# gym-workout

> Aplicação para controlar treinos de musculação

## Tecnologias usadas

* Express.js
* MongoDB
* Mongoose
* JWT
* Axios
* Vuetify
* Vue.js
* Vue Router
* Vuex
* Chart.js
* Day.js

## Como testar

```bash
# Criar um container para o mongodb (porta: 27017)
$ docker run --name mongo -h mongo -p 27017:27017 -d mongo

# Clonar o repositório
$ git clone https://github.com/eduardolagolima/gym-workout.git
$ cd gym-workout

# Instalar/configurar as dependências do backend
$ cd api
$ yarn
$ cp .env-example .env
$ sed -i "s/JWT_KEY=/JWT_KEY=gym-workout/" .env

# Instalar as dependências do frontend
$ cd web
$ yarn

# Rodar o backend em desenvolvimento (porta: 3333)
$ yarn serve

# Rodar o frontend em desenvolvimento (porta: 3000)
$ yarn serve
```
