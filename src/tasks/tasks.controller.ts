import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller({})
export class TasksController {
  constructor(public tasksService: TasksService) {}
  @Get('/tasks')
  getTasks() {
    return this.tasksService.getTasks();
  }
}
