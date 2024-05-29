import { randomUUID } from 'node:crypto';
import { Password } from './password';
import { Email } from './email';
import { Name } from './name';
import { Replace } from 'src/helpers/Replace';

interface UserProps {
  id: string;
  name: Name;
  email: Email;
  password: Password;
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

  set name(name: Name) {
    this.props.name = name;
  }

  get name(): Name {
    return this.props.name;
  }

  set email(email: Email) {
    this.props.email = email;
  }

  get email(): Email {
    return this.props.email;
  }

  set password(password: Password) {
    this.props.password = password;
  }

  get password(): Password {
    return this.props.password;
  }

  get createAt(): Date {
    return this.props.createAt;
  }
}

// Sendo instanciado no service e envia para a db
const user = new UserEntity({
  name: new Name('manaure'),
  email: new Email('manaure@gmail.com'),
  password: new Password('Manaure97@'),
});

console.log(user);
