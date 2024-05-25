export interface RecipeResponse {
  id: number;
  title: string;
  describe: string | null;
  valuePartial: number | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
