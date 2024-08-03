import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AllRecipes } from '@application/use-cases/recipes/get-all-recipes-from-user';
import { CreateRecipe } from '@application/use-cases/recipes/create';
import { RecipesDTO } from '../DTOs/recipe-dto';
import { RecipesWithIngredients } from '@application/use-cases/recipes/get-with-props';
import { DeleteRecipe } from '@application/use-cases/recipes/delete';
import { UpdateRecipe } from '@application/use-cases/recipes/update';
import { RecipesUpdatingDTO } from '../DTOs/recipe-update-dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { RecipeViewModel } from '../view-models/recipe-view-model';
import { Response } from 'express';

@Controller('recipes')
export class RecipesController {
  constructor(
    private allRecipes: AllRecipes,
    private createRecipe: CreateRecipe,
    private recipeWithIngredients: RecipesWithIngredients,
    private deleteRecipe: DeleteRecipe,
    private updateRecipe: UpdateRecipe,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecipes(
    @Request() req: any,
    @Res() res: Response,
    @Body() receivedValues: RecipesDTO,
  ): Promise<any> {
    try {
      const recipe = await this.createRecipe.execute({
        userId: req.user.id,
        title: receivedValues.title,
        describe: receivedValues.describe,
      });
      res.status(HttpStatus.CREATED).json({
        data: RecipeViewModel.toHTTP(recipe),
        message: 'Recipe created.',
      });
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed to create recipe.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllRecipes(@Request() req: any, @Res() res: Response) {
    try {
      const allRecipes = await this.allRecipes.execute(req.user.id);
      return res
        .status(HttpStatus.OK)
        .json(allRecipes.map(RecipeViewModel.toHTTP));
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed return recipes', error: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getRecipeWithIngredients(
    @Request() req: any,
    @Res() res: Response,
    @Param('id') recipeId: string,
  ) {
    try {
      const recipe = await this.recipeWithIngredients.execute(+recipeId);
      return res.status(HttpStatus.OK).json(RecipeViewModel.toHTTPGet(recipe));
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Not found recipe.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') receivedId: string, @Res() res: Response) {
    try {
      await this.deleteRecipe.execute(parseFloat(receivedId));
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed to delete recipe.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') receivedId: string,
    @Body() receivedValues: RecipesUpdatingDTO,
  ) {
    try {
      const recipe = await this.updateRecipe.execute({
        recipeId: +receivedId,
        title: receivedValues.title,
        describe: receivedValues.describe,
      });
      return res.status(HttpStatus.OK).json({
        data: RecipeViewModel.toHTTP(recipe),
        message: 'Updated recipe.',
      });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Failed updated recipe.' });
    }
  }
}
