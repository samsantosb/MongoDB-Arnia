class Service {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        try {
            const pokemons = await this.repository.getAll();
            return pokemons;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async getTheNameOfThePokemons() {
        try {
            const pokemons = await this.repository.getAll();

            /*
            Podemos ter diferentes serviços que utilizam o mesmo método de repositorio.
            Dessa maneira, reaproveitamos o código e evitamos repetições nas queries.            
            */
            //regra de negocio
            return pokemons.map(pokemon => pokemon.name);
        }
        catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async getById(id) {
        try {
            const pokemon = await this.repository.getById(id);
            return pokemon;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async getByName(name) {
        try {
            const pokemon = await this.repository.getByName(name);
            return pokemon;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async returnTheStrongestAttacker() {
        try {
            const allPokemons = await this.repository.getAll()
            const sortPokemonsByStrongestAttack = allPokemons.sort((a, b) => {
                return b.attack - a.attack
            })

            return sortPokemonsByStrongestAttack[0]
        }
        catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async getOnlyEletricPokemons() {
        try {
            const onlyEletricPokemons = await this.repository.getOnlyEletricPokemons()

            return onlyEletricPokemons
        }
        catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async create(pokemon) {
        try {
            const result = await this.repository.create(pokemon);
            return result;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async createMany(pokemons) {
        try {
            const result = await this.repository.createMany(pokemons);
            return result;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async update(id, pokemon) {
        try {
            const result = await this.repository.update(id, pokemon);
            return result;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async delete(id) {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }

    async deleteAll() {
        try {
            const result = await this.repository.deleteAll();
            return result;
        } catch (error) {
            return `Erro ao buscar todos os pokemons - mensagem do Mongo${error}`;
        }
    }
}


module.exports = { Service };

