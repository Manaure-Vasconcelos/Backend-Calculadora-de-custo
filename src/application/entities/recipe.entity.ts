import { Replace } from '@helpers/Replace';

interface RecipeProps {
  id: number | undefined;
  title: string;
  describe: string | null;
  userId: string;
  valuePartial: number | null;
  ingredients: any[];
  createAt: Date;
  updateAt: Date | null;
}

export class RecipeEntity {
  private props: RecipeProps;

  constructor(
    props: Replace<
      RecipeProps,
      {
        id?: number;
        describe?: string | null;
        valuePartial?: number | null;
        ingredients?: any[];
        createAt?: Date;
        updateAt?: Date | null;
      }
    >,
  ) {
    this.props = {
      id: props.id ?? undefined,
      title: props.title ?? 'Receita',
      describe: props.describe ?? null,
      userId: props.userId ?? 'FakeId',
      valuePartial: props.valuePartial ?? 0,
      createAt: props.createAt ?? new Date(),
      updateAt: props.updateAt ?? null,
      ingredients: props.ingredients ?? [],
    };
  }

  set id(id: number) {
    this.props.id = id;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get title(): string {
    return this.props.title;
  }

  set describe(describe: string) {
    this.props.describe = describe;
  }

  get describe(): string | null {
    return this.props.describe;
  }

  set valuePartial(valuePartial: number) {
    this.props.valuePartial = valuePartial;
  }

  get valuePartial(): number | null {
    return this.props.valuePartial;
  }

  set ingredients(ingredients: any) {
    this.props.ingredients = ingredients;
  }

  get ingredients(): any[] {
    return this.props.ingredients;
  }

  get userId() {
    return this.props.userId;
  }

  get createAt(): Date {
    return this.props.createAt;
  }
}
