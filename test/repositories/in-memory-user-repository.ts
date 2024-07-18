import { NotFoundException } from '@nestjs/common';

export class InMemoryUserRepository {
  public ListUsers: any[] = [
    {
      id: 'id',
      name: 'manaure',
      email: 'manaure@gmail.com',
      password: 'Password123@',
      recipes: [],
    },
  ];
  public RecipeList: any[] = [];

  async create(user: any): Promise<void> {
    this.ListUsers.push(user);
  }
  async findUser(emailUser: string): Promise<any> {
    return this.ListUsers.find((user) => user.email === emailUser);
  }
  async findUserWithProps(idUser: string): Promise<any> {
    const user = this.ListUsers.find((user) => user.id === idUser);
    if (!user) throw new NotFoundException('NotFound User');
    return { user };
  }
  async delete(): Promise<any> {
    this.ListUsers.pop();
  }
  async save(receivedValues: any): Promise<any> {
    const userIndex = this.ListUsers.findIndex(
      (item) => item.id === receivedValues.id,
    );

    if (userIndex == 0) {
      this.ListUsers[userIndex] = receivedValues;
    }
  }
}
