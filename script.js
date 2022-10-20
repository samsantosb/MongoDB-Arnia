//https://www.npmjs.com/package/mongodb -> para se conectar e operar no mongoDB
//https://www.npmjs.com/package/dotenv -> para armazenar dados sensíveis
const { MongoClient } = require('mongodb'); // -> se conectar no DB
require('dotenv').config(); // -> ler os arquivos .env
const { Repository } = require('./repositories/repositories'); // -> importar a classe Repository


const mongoUrl = process.env.MONGO; //definimos a string/key de conexão -> aqui a gente configura
const client = new MongoClient(mongoUrl) //instanciamos o cliente -> aqui a gente configura

const database = client.db('test').collection('pokemons') //definimos qual é o banco de dados -> aqui a gente configura
//não existe repositorio sem a constante a cima

const repository = new Repository(database);
//Injeção de dependencia -> passar o parâmetro para a classe que depende dele
//instanciamos o repositorio -> aqui a gente configuramos

async function script() {
    try {
        await client.connect(); //nos conectamos -> aqui a gente acessa
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log('erro ao conectar no DB', error);
    }

    // const allPokemons = await repository.getAll()
    // console.log('Todos os pokemons', allPokemons);

    // const pokemon = await repository.getById('6351d6b1b548c78ca7761d41')
    // console.log('Pokemon', pokemon);

    // const pokemonByName = await repository.getByName('Pikachu')
    // console.log(pokemonByName);

    // const createGolduck = await repository.create({
    //     name: 'Golduck',
    //     type: 'Water',
    //     level: 100
    // })

    // console.log(`Pokemon criado com sucesso ${createGolduck.insertedId}`);

    // const updateGolduck = await repository.update('6351d6b1b548c78ca7761d41', {
    //     name: 'Golduck',
    //     type: 'Psychic and Water',
    //     level: 100,
    //     nickName: 'gold'
    // })

    // console.log('Golduck atualizado', updateGolduck);

    // const deleteGolduck = await repository.delete('6351d6b1b548c78ca7761d41')
    // console.log('Golduck deletado', deleteGolduck);

    // try {
    //     await repository.deleteAll();
    //     console.log('Todos os pokemons deletados');
    // } catch (error) {
    //     console.log('erro ao deletar todos os pokemons', error);
    // }

    try {
        await client.close();
        console.log('Conexão fechada');
    } catch (error) {
        console.log('erro ao fechar conexão', error);
    }
}

script();