import { Replace } from '@helpers/Replace';

interface RecipeProps {
  id: number;
  title: string;
  describe: string | null;
  userId: string;
  valuePartial: number | null;
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
        createAt?: Date;
        updateAt?: Date | null;
        valuePartial?: number | null;
      }
    >,
  ) {
    this.props = {
      id: props.id ?? 0,
      title: props.title,
      describe: props.describe ?? null,
      userId: props.userId,
      createAt: props.createAt ?? new Date(),
      updateAt: props.updateAt ?? null,
      valuePartial: props.valuePartial ?? 0,
    };
  }

  set id(id: number) {
    this.props.id = id;
  }

  get id(): number {
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
