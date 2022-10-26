const { describe, it, expect } = global;
const { fakeDatabase, fakeIdArray, errorMessage } = require('../__mocks__/fake.database');
const { fakeRepository, fakeRepositoryError } = require('../__mocks__/fake.repository');

const { Service } = require('../services/services');

const service = new Service(fakeRepository);
// const serviceError = new Service(fakeRepositoryError);
// console.log(service.getAll().then((result) => console.log(result)));
describe('Service', () => {
    describe('getAll', () => {
        it('should return an array of pokemons', async () => {

            //instancia um resultado com base no retorno do serviço
            const result = await service.getAll();

            //verifica se o resultado é o esperado
            expect(result).toEqual(fakeDatabase);
        });
        it('should return a error', async () => {

            //altera o valor do repositorio para um que retorna erro
            //o spyOn vai substituir o método getAll do repositorio, ele observa e altera tudo que é desginado a ele
            //o mockRejectedValueOnce altera o nosso mock temporariamente apenas para a execução desse teste
            jest.spyOn(fakeRepository, 'getAll').mockRejectedValueOnce('Erro ao buscar o pokemon');

            //o erro é atribuido ao result, que joga a gente no catch do serviço
            const result = await service.getAll();

            //verificamos se o erro é o mesmo que escrevemos no serviço
            expect(result).toEqual(errorMessage);
        })
        it('should return a typeof array', async () => {
            //instancia um resultado com base no retorno do serviço
            const result = await service.getAll();

            //verifica se é uma array
            expect(Array.isArray(result)).toBe(true);
        })
    });
    describe('getById', () => {
        it('should return a pokemon by id', async () => {
            const result = await service.getById(fakeIdArray[0]);
            expect(result).toEqual(fakeDatabase[0]);
        });
        it('should return a error', async () => {
            jest.spyOn(fakeRepository, 'getById').mockRejectedValueOnce('Erro ao buscar o pokemon');
            const result = await service.getById(fakeIdArray[0]);
            expect(result).toEqual(errorMessage);
        });
        it('should return a typeof object', async () => {
            const result = await service.getById(fakeIdArray[0]);
            expect(typeof result).toBe('object');
        });
    });

    describe('returnTheStrongestAttacker', () => {
        it('should return the strongest attacker', async () => {
            const result = await service.returnTheStrongestAttacker();
            expect(result).toEqual(fakeDatabase[0]);
        });
        it('should return a error', async () => {
            jest.spyOn(fakeRepository, 'getAll').mockRejectedValueOnce('Erro ao buscar o pokemon');
            const result = await service.returnTheStrongestAttacker();
            expect(result).toEqual(errorMessage);
        });
        it('should return a typeof object', async () => {
            const result = await service.returnTheStrongestAttacker();
            expect(typeof result).toBe('object');
        });
    })
    describe('create', () => {
        it('should create a pokemon', async () => {
            const result = await service.create(fakeDatabase[0]);
            expect(result).toEqual(fakeDatabase[0]);
        });
        it('should return a error', async () => {
            jest.spyOn(fakeRepository, 'create').mockRejectedValueOnce('Erro ao buscar o pokemon');
            const result = await service.create(fakeDatabase[0]);
            expect(result).toEqual(errorMessage);
        });
        it('should return a typeof object', async () => {
            const result = await service.create(fakeDatabase[0]);
            expect(typeof result).toBe('object');
        });
    });
});