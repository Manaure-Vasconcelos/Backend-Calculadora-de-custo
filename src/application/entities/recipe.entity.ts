import { Replace } from '@helpers/Replace';

interface RecipeProps {
  id: string;
  title: string;
  describe: string | null;
  userId: string;
  createAt: Date;
  valuePartial: number | null;
}

export class RecipeEntity {
  private props: RecipeProps;

  constructor(
    props: Replace<
      RecipeProps,
      { id?: string; describe?: string; createAt?: Date; valuePartial?: number }
    >,
  ) {
    this.props = {
      id: props.id ?? 'fakeId',
      ...props,
      describe: props.describe ?? null,
      createAt: props.createAt ?? new Date(),
      valuePartial: props.valuePartial ?? null,
    };
  }

  set id(id: string) {
    this.props.id = id;
  }

  get id(): string {
    return this.props.id;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get title() {
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

  get userId() {
    return this.props.userId;
  }

  get createAt(): Date {
    return this.props.createAt;
  }
}
