import { IngredientService } from '../ingredient/ingredient.service';
import { TableIngredientsService } from './table-ingredients.service';

const food1 = new IngredientService('comida1', 6, 10, 3);
const createSut = () => new TableIngredientsService(food1);

describe('TableIngredientsService', () => {
  it('should setting ingredient in array', () => {
    const sut = createSut();

    const ingredients = sut.getIngredient();
    sut.setIngredient(food1);
    expect(ingredients).toEqual([food1]);
  });

  it('Should setting value partial of recipe', () => {
    const sut = createSut();
    sut.setIngredient(food1);

    const valuePartial = sut.getValuePartialOfRecipe();
    expect(valuePartial).toBe(5);
  });

  it('Should called methods in setIngredient', () => {
    const sut = createSut();
    const methodSetRealAmountSpy = jest.spyOn(
      IngredientService.prototype,
      'setRealAmount',
    );
    const methodSetValuePartialSpy = jest
      .spyOn(TableIngredientsService.prototype, 'setValuePartialOfRecipe')
      .mockImplementation(() => {});
    sut.setIngredient(food1);

    expect(methodSetRealAmountSpy).toHaveBeenCalledTimes(1);
    expect(methodSetValuePartialSpy).toHaveBeenCalledTimes(1);
  });
  /* let service: TableIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableIngredientsService],
    }).compile();

    service = module.get<TableIngredientsService>(TableIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); */
});
