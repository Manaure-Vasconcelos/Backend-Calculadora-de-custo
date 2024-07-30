import { randomUUID } from 'node:crypto';
import { Password } from './password';
import { Replace } from 'src/helpers/Replace';
import { RecipeProps } from '../recipe.entity';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: Password | string;
  recipes?: RecipeProps[];
  createAt: Date;
}

export class UserEntity {
  private props: UserProps;

  constructor(props: Replace<UserProps, { id?: string; createAt?: Date }>) {
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      createAt: props.createAt ?? new Date(),
    };
  }

  set id(id: string) {
    this.props.id = id;
  }

  get id(): string {
    return this.props.id;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get name(): string {
    return this.props.name;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get email(): string {
    return this.props.email;
  }

  set password(password: Password) {
    this.props.password = password;
  }

  get password(): Password | string {
    return this.props.password;
  }

  get createAt(): Date {
    return this.props.createAt;
  }

  get recipes() {
    return this.props.recipes;
  }
}
