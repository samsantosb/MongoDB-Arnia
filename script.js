//https://www.npmjs.com/package/mongodb -> para se conectar e operar no mongoDB
//https://www.npmjs.com/package/dotenv -> para armazenar dados sensíveis
const { MongoClient } = require('mongodb'); // -> se conectar no DB
require('dotenv').config(); // -> ler os arquivos .env

const mongoUrl = process.env.MONGO; //definimos a string/key de conexão -> aqui a gente configura
const client = new MongoClient(mongoUrl) //instanciamos o cliente -> aqui a gente configura



async function script() {
    try {
        await client.connect(); //nos conectamos -> aqui a gente acessa
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log('erro ao conectar no DB', error);
    }

    const db = client.db('test') //definimos qual é o banco de dados -> aqui a gente configura
    const collection = db.collection('pokemons') //definimos a collection -> aqui a gente configura

    // const pikachu = await collection.insertOne({ name: 'Pikachu', type: 'eletric' }) //aqui a gente acessa

    // console.log(pikachu, 'Pikachu inserido com sucesso')

    // const pokemons = [
    //     { name: 'Bulbasaur', type: 'grass' },
    //     { name: 'Charmander', type: 'fire' },
    //     { name: 'Squirtle', type: 'water' },
    //     { name: 'Caterpie', type: 'bug' },
    //     { name: 'Weedle', type: 'bug' },
    //     { name: 'Pidgey', type: 'normal' },
    //     { name: 'Rattata', type: 'normal' },
    //     { name: 'Spearow', type: 'normal' },
    //     { name: 'Ekans', type: 'poison' },
    // ]

    // try {
    //     await collection.insertMany(pokemons) //insere vários pokemons de uma vez
    //     console.log('Pokemons inseridos com sucesso')
    // } catch (error) {
    //     console.log('erro ao inserir pokemons', error);
    // }

    //delete ekans please, i hate ekans
    //const ekans = await collection.deleteOne({ name: 'Ekans' })
    //log ekans
    //console.log(ekans, 'Ekans deletado com sucesso')

    //find bulbasaur
    //const bulbasaur = await collection.findOne({ name: 'Bulbasaur' })

    //log bulbasaur
    //console.log(bulbasaur, 'Bulbasaur encontrado com sucesso')

    //find all pokemons
    const allPokemons = await collection.find({}).toArray()

    for (const pokemon of allPokemons) {
        pokemon.level = Math.floor(Math.random() * 100)

        try {
            await collection.updateOne({ _id: pokemon._id }, { $set: { level: pokemon.level } })
            console.log(`${pokemon.name} atualizado com sucesso`)
        }
        catch (error) {
            console.log(`erro ao atualizar ${pokemon.name}`, error);
        }
    }

    try {
        await client.close();
        console.log('Conexão fechada');
    } catch (error) {
        console.log('erro ao fechar conexão', error);
    }
}
script();