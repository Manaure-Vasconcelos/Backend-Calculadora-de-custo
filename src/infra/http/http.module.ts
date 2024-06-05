import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { UsersController } from './controllers/users.controller';
import { RecipesController } from './controllers/recipes.controller';
import { GetUser } from '@application/use-cases/user/get-acount';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { UpdateUser } from '@application/use-cases/user/update';
import { DatabaseModule } from '../dataBase/database.module';
import { AllRecipes } from 'src/application/use-cases/recipes/get-all-recipes-from-user';
import { CreateRecipe } from '@application/use-cases/recipes/create';
import { RecipesWithIngredients } from 'src/application/use-cases/recipes/get-recipe-with-ingredients';
import { DeleteRecipe } from '@application/use-cases/recipes/delete';
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
import { HashPassword } from 'src/auth/hashPassword';
import { GetUserWithProps } from '@application/use-cases/user/get-profile';

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
          signOptions: { algorithm: 'RS256', expiresIn: '20m' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [
    UsersController,
    RecipesController,
    IngredientsController,
    AuthController,
  ],
  providers: [
    GetUser,
    GetUserWithProps,
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
    HashPassword,
  ],
})
export class HttpModule {}
