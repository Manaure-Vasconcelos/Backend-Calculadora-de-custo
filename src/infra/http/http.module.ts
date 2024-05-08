import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { UsersController } from './controllers/users.controller';
import { RecipesController } from './controllers/recipes.controller';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { UserWithRecipes } from 'src/application/use-cases/user/get-user-with-recipe';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { DatabaseModule } from '../dataBase/database.module';
import { AllRecipes } from 'src/application/use-cases/recipes/get-all-recipes';
import { CreateRecipe } from 'src/application/use-cases/recipes/create-recipe';
import { RecipesWithIngredients } from 'src/application/use-cases/recipes/get-recipe-with-ingredients';
import { DeleteRecipe } from 'src/application/use-cases/recipes/delete-recipe';
import { UpdateRecipe } from 'src/application/use-cases/recipes/update-recipe';
import { UpdateIngredient } from 'src/application/use-cases/ingredients/update-ingredient';
import { DeleteIngredient } from 'src/application/use-cases/ingredients/delete-ingredient';
import { CreateIngredient } from 'src/application/use-cases/ingredients/create-ingredient';
import { GetSingleIngredient } from 'src/application/use-cases/ingredients/get-single-ingredient';
import { RealAmountService } from 'src/application/use-cases/ingredients/realAmount.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, RecipesController, IngredientsController],
  providers: [
    CreateUser,
    UserWithRecipes,
    DeleteUser,
    UpdateUser,
    AllRecipes,
    CreateRecipe,
    RecipesWithIngredients,
    DeleteRecipe,
    UpdateRecipe,
    CreateIngredient,
    GetSingleIngredient,
    DeleteIngredient,
    UpdateIngredient,
    RealAmountService,
  ],
})
export class HttpModule {}
