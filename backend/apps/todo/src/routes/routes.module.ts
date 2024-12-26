import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { TodoModule } from '../todo/todo.module';

const routes: Routes = [
    {
        path: '/',
        children: [
            {
                path: '/',
                module: TodoModule,
            }
        ],
    }
];
@Module({
    imports: [RouterModule.register([{ path: 'api/', children: routes }])],
})
export class RoutesModule { }
