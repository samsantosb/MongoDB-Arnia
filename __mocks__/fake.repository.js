const { fakeDatabase, fakeIdArray } = require('../__mocks__/fake.database');

const fakeRepository = {
    getAll() {
        //ele retorna uma promessa de array de pokemons
        //quando usamos Promise.resolve, estamos falando que o que está dentro
        //dos parenteses é uma promessa
        return Promise.resolve(fakeDatabase)
    },
    getById(id) {
        return Promise.resolve(fakeDatabase[0])
    },
    getByName(name) {
        //quando a gente for testar esse, passar o nome pikachu no parametro
        return Promise.resolve(fakeDatabase[0])
    },
    getOnlyEletricPokemons() {
        return Promise.resolve(fakeDatabase[0])
    },
    create(pokemon) {
        return Promise.resolve(fakeDatabase[0])
    },
    update(id, pokemon) {
        return Promise.resolve(fakeDatabase[0])
    },
    delete(id) {
        return Promise.resolve(fakeDatabase[0])
    },
    deleteAll() {
        return Promise.resolve(fakeDatabase)
    },
    createMany(pokemons) {
        return Promise.resolve(fakeDatabase)
    }
}

const fakeRepositoryError = {
    getAll() {
        return Promise.reject('Erro ao buscar o pokemon')
    }
}

module.exports = { fakeRepository, fakeRepositoryError }