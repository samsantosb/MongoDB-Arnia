const fakeIdArray = ['6353217154776fec4426cd68',
    '6353217154776fec4426cd69',
    '6353217154776fec4426cd70',
    '6353217154776fec4426cd70'];

const fakeDatabase = [
    {
        _id: fakeIdArray[0],
        name: 'Pikachu',
        type: 'Eletric',
        attack: 55,
        defense: 40,
    },
    {
        _id: fakeIdArray[1],
        name: 'Voltorb',
        type: 'Eletric',
        attack: 40,
        defense: 30,
    },
    {
        _id: fakeIdArray[2],
        name: 'Bulbasaur',
        type: 'Grass',
        attack: 49,
        defense: 49,
    },
    {
        _id: fakeIdArray[3],
        name: 'Charmander',
        type: 'Fire',
        attack: 52,
        defense: 43,
    },
]

const errorMessage = 'Erro ao buscar todos os pokemons - mensagem do MongoErro ao buscar o pokemon'
module.exports = { fakeDatabase, fakeIdArray, errorMessage };