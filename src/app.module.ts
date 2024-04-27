import { Module } from '@nestjs/common';
import { TableIngredientsModule } from './table-ingredients/table-ingredients.module';
import { TableCostUnitModule } from './table-cost-unit/table-cost-unit.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TableIngredientsModule, TableCostUnitModule, UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
