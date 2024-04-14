import { IngredientService } from './ingredient.service';

const createSut = (
  describe: string,
  marketWeight: number,
  marketPrice: number,
  grossWeight: number,
  _realAmount?: number,
): IngredientService =>
  new IngredientService(
    describe,
    marketWeight,
    marketPrice,
    grossWeight,
    _realAmount,
  );

describe('IngredientService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should initialize the properties correctly', () => {
    const describe = 'Test Ingredient';
    const marketWeight = 10;
    const marketPrice = 20;
    const grossWeight = 5;

    const sut = createSut(describe, marketWeight, marketPrice, grossWeight);

    expect(sut).toHaveProperty('describe', 'Test Ingredient');
    expect(sut).toHaveProperty('marketWeight', 10);
    expect(sut).toHaveProperty('marketPrice', 20);
    expect(sut).toHaveProperty('grossWeight', 5);
    expect(sut._realAmount).toBeUndefined();
  });

  it('should return the usual cost of the ingredient', () => {
    const food1 = createSut('comida2', 6, 10, 3);

    food1.setRealAmount();

    expect(food1._realAmount).toBe(5);
  });
  /* let service: IngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientService],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); */
});
