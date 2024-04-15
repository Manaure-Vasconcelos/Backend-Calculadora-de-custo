import { Module } from '@nestjs/common';
import { TableIngredientsModule } from './table-ingredients/table-ingredients.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { TableCostUnitModule } from './table-cost-unit/table-cost-unit.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { HomeService } from './home/home.service';

@Module({
  imports: [TableIngredientsModule, IngredientModule, TableCostUnitModule, UsersModule, TasksModule, ProjectsModule, AuthModule],
  controllers: [],
  providers: [HomeService],
})
export class AppModule {}
