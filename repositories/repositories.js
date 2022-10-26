const { ObjectId } = require("mongodb");
//Object ID recebe um ID que é uma string e transforma ele em um ID do mongoDB

class Repository {
    constructor(database) {
        this.database = database;

        //# deixa a variavel ou o metodo privado
        //database é provido pela bibilioteca do mongoDB
        //estamos injentando a dependencia database em nossa classe
    }
    async getAll() {
        /*busca todos os pokemons e converte eles pra array no formato javascript*/
        const pokemons = await this.database.find({}).toArray();

        if (!pokemons) {
            return [];
        }

        return pokemons;
    }
    async getById(id) {
        /*busca um pokemon pelo id e converte ele para um objeto*/
        const pokemon = await this.database.find({ _id: new ObjectId(id) }).toArray();

        if (!pokemon) {
            return [];
        }

        return pokemon;
    }
    async getByName(name) {
        /*busca um pokemon pelo nome e converte ele para um objeto*/
        const pokemon = await this.database.find({ name: name }).toArray();

        if (!pokemon) {
            return [];
        }

        return pokemon;
    }

    async getOnlyEletricPokemons() {
        /*Busca pokemons cujo tipo seja eletrico*/
        const pokemon = await this.database.find({ type: "Eletric" }).toArray();
        return pokemon;
    }

    async create(pokemon) {
        /*cria um pokemon*/
        const result = await this.database.insertOne(pokemon);

        if (!result) {
            return [];
        }

        return result;
    }

    async createMany(pokemons) {
        /*cria varios pokemons*/
        const result = await this.database.insertMany(pokemons);

        if (!result) {
            return [];
        }

        return result;
    }

    async update(id, pokemon) {
        /*atualiza um pokemon*/
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $set: pokemon });
        //o $set é um operador do mongoDB
        //o que ele faz copilot???
        //ele atualiza o pokemon que foi passado
        //como ???
        //ele pega o pokemon que foi passado e substitui ele no banco de dados
        //e se vierem novos atributos ???
        //ele adiciona eles no banco de dados
        //e se vierem atributos com novos valores ???
        //ele atualiza eles no banco de dados

        if (!result) {
            return [];
        }

        return result;
    }
    async delete(id) {
        /*deleta um pokemon*/
        const result = await this.database.deleteOne({ _id: new ObjectId(id) });

        if (!result) {
            return [];
        }

        return result;
    }

    async deleteAll() {
        /*deleta todos os pokemons*/
        //Nunca use mais saiba que existe
        const result = await this.database.deleteMany();

        if (!result) {
            return [];
        }

        return result;
    }
}

module.exports = { Repository };

