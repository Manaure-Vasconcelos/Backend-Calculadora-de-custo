import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getTasks() {
    return ['task1', 'task2', 'task3'];
  }
}
