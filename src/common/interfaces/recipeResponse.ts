export interface RecipeResponse {
  id: number;
  title: string;
  describe: string | null;
  valuePartial: number | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
