export class InMemoryUserRepository {
  public ListUsers: any[] = [];

  async create(user: any): Promise<void> {
    this.ListUsers.push(user);
  }
  async findUser(emailUser: string): Promise<any> {
    return this.ListUsers.find((user) => user.email === emailUser);
  }
  async findUserWithProps(idUser: string): Promise<any> {
    return this.ListUsers.find((user) => user.id === idUser);
  }
  async delete(): Promise<any> {
    this.ListUsers.pop();
  }
  async save(receivedValues: any): Promise<any> {
    this.ListUsers.push(receivedValues);
  }
}
