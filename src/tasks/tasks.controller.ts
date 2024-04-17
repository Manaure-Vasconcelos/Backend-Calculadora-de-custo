import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskPutDto } from './dto/task-put-dto';
import { TaskDto } from './dto/task-dto';

@Controller('/tasks')
export class TasksController {
  constructor(public tasksService: TasksService) {}
  // Retorna algo de algum lugar. Banco de dados.
  @Get()
  getAllTasks(@Query() query: TaskDto) {
    console.log(query);
    console.log(this.tasksService.getAllTasks());
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }
  // Seta informações, envio de forms.
  @Post()
  createTask(@Body() task: TaskDto) {
    return this.tasksService.createTask(task);
  }
  // Atualiza total.
  @Put() // {title: 'task1', status: false} => {title: 'Done', status: true}
  updateTasks() {
    return this.tasksService.updateTask();
  }
  // Deleta
  @Delete()
  deleteTask() {
    return this.tasksService.deleteTask();
  }
  // Atualiza somente uma parte.
  @Patch() // {title: 'task1', status: false} => {title: 'task1', status: true}
  updateTaskStatus(@Body() task: TaskPutDto) {
    return this.tasksService.updateStatusTask(task);
  }
}
