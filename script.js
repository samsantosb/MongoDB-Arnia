//https://www.npmjs.com/package/mongodb -> para se conectar e operar no mongoDB
//https://www.npmjs.com/package/dotenv -> para armazenar dados sensíveis
const { MongoClient } = require('mongodb'); // -> se conectar no DB
require('dotenv').config(); // -> ler os arquivos .env
const { Repository } = require('./repositories/repositories'); // -> importar a classe Repository
const { Service } = require('./services/services'); // -> importar a classe Service

const mongoUrl = process.env.MONGO; //definimos a string/key de conexão -> aqui a gente configura
const client = new MongoClient(mongoUrl) //instanciamos o cliente -> aqui a gente configura

const database = client.db('test').collection('pokemons') //definimos qual é o banco de dados -> aqui a gente configura
//não existe repositorio sem a constante a cima

const repository = new Repository(database);

const service = new Service(repository);
//Injeção de dependencia -> passar o parâmetro para a classe que depende dele
//instanciamos o repositorio -> aqui a gente configuramos

async function script() {
    try {
        await client.connect(); //nos conectamos -> aqui a gente acessa
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log('erro ao conectar no DB', error);
    }

    const pokemons = await service.getAll();
    console.log(pokemons);

    // const pokemonsArray = [
    //     {
    //         name: 'Pikachu',
    //         type: 'Eletric',
    //         attack: 55,
    //         defense: 40,
    //     },
    //     {
    //         name: 'Bulbasaur',
    //         type: 'Grass',
    //         attack: 49,
    //         defense: 49,
    //     },
    //     {
    //         name: 'Charmander',
    //         type: 'Fire',
    //         attack: 52,
    //         defense: 43,
    //     },
    // ]

    //const result = await service.createMany(pokemonsArray);

    // const allPokemons = await service.getAll();

    // console.log(allPokemons);

    //console.log(await service.getTheNameOfThePokemons());
    // console.log(await service.returnTheStrongestAttacker())

    // console.log(await service.getOnlyEletricPokemons())

    try {
        await client.close();
        console.log('Conexão fechada');
    } catch (error) {
        console.log('erro ao fechar conexão', error);
    }
}

script();


/*
Passo a passo para criar um Script, com Node, MongoDB e arquitetura em camadas

1 - Criar um arquivo .env na raiz do projeto, aqui ficara sua chave de acesso
2 - Criar um arquivo .gitignore na raiz do projeto, aqui ficara os arquivos que não serão enviados para o github
3 - Criar um arquivo package.json na raiz do projeto, aqui ficara as dependencias do projeto
4 - Criar um arquivo script.js na raiz do projeto, aqui ficara o script
5 - Criar uma pasta repositories na raiz do projeto, aqui ficara a classe de QUERY no banco de dados
6 - Criar uma pasta services na raiz do projeto, aqui ficara a classe de regra de negócio e o tratamento de erros
7 - No script, chamar a bibilioteca do MongoDB e o dotenv
8 - Instanciar o cliente do MongoDB
9 - Instanciar o repositorio
10 - Instanciar o serviço
11 - Conectar no banco de dados
12 - Utilizar o serviço ao seu bem querer e necessidade
13 - Fechar a conexão com o banco de dados
14 - FIM

Quais são as camadas

Lib do MONGO -> Repositorio(Mongo) -> Service(Repositorio) -> Script(Servico) 

*/




/*
Eu não quero usar arquitetura em camadas, como eu faço?

instancia o database do mongo
const database = client.db('test').collection('pokemons') 

chama todos os métodos a partir dele
ex: 

const insertOne = await database.insertOne(pokemon);
const find = await database.find().toArray();
const findOne = await database.findOne({ name: 'Pikachu' });
const updateOne = await database.updateOne({ name: 'Pikachu' }, { $set: { attack: 100 } });
const deleteOne = await database.deleteOne({ name: 'Pikachu' });
const deleteMany = await database.deleteMany({ name: 'Pikachu' });
const createIndex = await database.createIndex({ name: 1 });
const dropIndex = await database.dropIndex('name_1');
const drop = await database.drop();
const count = await database.countDocuments();

Utilizamos dessa maneira quando não temos tempo para desenvolver

*/