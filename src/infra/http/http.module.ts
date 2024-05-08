import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { UsersController } from './controllers/users.controller';
import { RecipesController } from './controllers/recipes.controller';

@Module({
  imports: [],
  controllers: [UsersController, RecipesController, IngredientsController],
})
export class HttpModule {}
