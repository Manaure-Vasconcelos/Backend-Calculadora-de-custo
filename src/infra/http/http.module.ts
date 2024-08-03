import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { UsersController } from './controllers/users.controller';
import { RecipesController } from './controllers/recipes.controller';
import { GetUser } from '@application/use-cases/user/get-acount';
import { DeleteUser } from '@application/use-cases/user/delete-user';
import { UpdateUser } from '@application/use-cases/user/update';
import { DatabaseModule } from '../dataBase/database.module';
import { AllRecipes } from '@application/use-cases/recipes/get-all-recipes-from-user';
import { CreateRecipe } from '@application/use-cases/recipes/create';
import { RecipesWithIngredients } from '@application/use-cases/recipes/get-with-props';
import { DeleteRecipe } from '@application/use-cases/recipes/delete';
import { UpdateRecipe } from '@application/use-cases/recipes/update';
import { SaveIngredient } from '@application/use-cases/ingredients/save';
import { DeleteIngredient } from '@application/use-cases/ingredients/delete-ingredient';
import { CreateIngredient } from '@application/use-cases/ingredients/create';
import { GetSingleIngredient } from '@application/use-cases/ingredients/get-single-ingredient';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashPassword } from '@auth/hashPassword';
import { GetById } from '@application/use-cases/user/get-by-id';
import { GetProfile } from '@application/use-cases/profile/get-profile';
import { SaveProfile } from '@application/use-cases/profile/save';
import { ProfileController } from './controllers/profile.controller';
import { ExpensesController } from './controllers/expenses.controller';
import { GetExpenses } from '@application/use-cases/expenses/getExpenses';
import { SaveExpenses } from '@application/use-cases/expenses/saveExpenses';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      async useFactory(configService: ConfigService) {
        const privateKey = configService.get<string>('JWT_PRIVATE_KEY');
        const publicKey = configService.get<string>('JWT_PUBLIC_KEY');
        if (!privateKey || !publicKey) throw new Error();
        return {
          signOptions: { algorithm: 'RS256', expiresIn: '7d' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [
    UsersController,
    ProfileController,
    RecipesController,
    ExpensesController,
    IngredientsController,
    AuthController,
  ],
  providers: [
    GetUser,
    GetById,
    DeleteUser,
    UpdateUser,
    GetProfile,
    SaveProfile,
    AllRecipes,
    CreateRecipe,
    RecipesWithIngredients,
    DeleteRecipe,
    UpdateRecipe,
    GetExpenses,
    SaveExpenses,
    CreateIngredient,
    GetSingleIngredient,
    DeleteIngredient,
    SaveIngredient,
    AuthService,
    JwtStrategy,
    HashPassword,
  ],
})
export class HttpModule {}
