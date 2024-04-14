import { IngredientService } from '../ingredient/ingredient.service';
import { TableIngredientsService } from '../table-ingredients/table-ingredients.service';
import { TableCostUnitService } from './table-cost-unit.service';

const comida1 = new IngredientService('comida1', 6, 10, 3);
const tableOfIngredients = new TableIngredientsService(comida1);
const createSut = () => new TableCostUnitService(tableOfIngredients);

describe('TableCostUnitService', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should setting the servings recipe', () => {
    const sut = createSut();
    sut.setServings(2);

    expect(sut.getServings()).toBe(2);
  });

  it('Should setting the packaging', () => {
    const sut = createSut();
    sut.setPackaging(2);

    expect(sut.getPackaging()).toBe(2);
  });

  it('should costUnit return to be 0', () => {
    const sut = createSut();

    const result = sut.costUnit();

    expect(result).toBe(0);
  });

  it('should costUnit return to be 3.5', () => {
    const sut = createSut();
    tableOfIngredients.setIngredient(comida1);
    sut.setServings(2);
    sut.setPackaging(1);
    const result = sut.costUnit();

    expect(result).toBe(3.5);
  });
  /* let service: TableCostUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableCostUnitService],
    }).compile();

    service = module.get<TableCostUnitService>(TableCostUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); */
});
