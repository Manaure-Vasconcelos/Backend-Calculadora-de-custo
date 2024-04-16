import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskPutDto } from './dto/task-put-dto';
import { TaskDto } from './dto/task-dto';

@Injectable()
export class TasksService {
  private tasksList = [];

  getAllTasks() {
    if (this.tasksList.length === 0) return 'Empty tasks list';
    return this.tasksList;
  }

  getTask(id: number) {
    const taskFound = this.tasksList.find((task) => task.id === id);
    if (!taskFound) return new NotFoundException(`Task ${id} not found`);
    return taskFound;
  }

  createTask(task: TaskDto) {
    this.tasksList.push({
      ...task,
      id: this.tasksList.length + 1,
    });
    return task;
  }

  updateTask() {
    return 'Updating Task';
  }

  deleteTask() {
    return 'Delete Task';
  }

  updateStatusTask(task: TaskPutDto) {
    return task;
  }
}
