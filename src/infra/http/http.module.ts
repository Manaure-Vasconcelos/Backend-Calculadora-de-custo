import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { UsersController } from './controllers/users.controller';
import { RecipesController } from './controllers/recipes.controller';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { GetUser } from 'src/application/use-cases/user/get-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { DatabaseModule } from '../dataBase/database.module';
import { AllRecipes } from 'src/application/use-cases/recipes/get-all-recipes-from-user';
import { CreateRecipe } from 'src/application/use-cases/recipes/create-recipe';
import { RecipesWithIngredients } from 'src/application/use-cases/recipes/get-recipe-with-ingredients';
import { DeleteRecipe } from 'src/application/use-cases/recipes/delete-recipe';
import { UpdateRecipe } from 'src/application/use-cases/recipes/update-recipe';
import { UpdateIngredient } from 'src/application/use-cases/ingredients/update-ingredient';
import { DeleteIngredient } from 'src/application/use-cases/ingredients/delete-ingredient';
import { CreateIngredient } from 'src/application/use-cases/ingredients/create-ingredient';
import { GetSingleIngredient } from 'src/application/use-cases/ingredients/get-single-ingredient';
import { RealAmountService } from 'src/application/use-cases/ingredients/realAmount.service';
import { UpdatingValuePartial } from 'src/application/use-cases/recipes/update-value-partial';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    UsersController,
    RecipesController,
    IngredientsController,
    AuthController,
  ],
  providers: [
    CreateUser,
    GetUser,
    DeleteUser,
    UpdateUser,
    AllRecipes,
    CreateRecipe,
    RecipesWithIngredients,
    DeleteRecipe,
    UpdateRecipe,
    UpdatingValuePartial,
    CreateIngredient,
    GetSingleIngredient,
    DeleteIngredient,
    UpdateIngredient,
    RealAmountService,
    AuthService,
    JwtStrategy,
  ],
})
export class HttpModule {}
