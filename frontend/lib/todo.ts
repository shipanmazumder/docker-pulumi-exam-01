import { Todo } from "@/types/todo";

let todos: Todo[] = [];

export const getTodos = (): Todo[] => {
	return todos;
};

export const addTodo = (title: string, description: string): Todo => {
	const newTodo: Todo = {
		id: Math.random().toString(36).substring(7),
		title,
		description,
		completed: false,
		createdAt: new Date(),
	};
	todos = [newTodo, ...todos];
	return newTodo;
};

export const toggleTodo = (id: string): Todo | undefined => {
	const todo = todos.find((t) => t.id === id);
	if (todo) {
		todo.completed = !todo.completed;
		todos = [...todos];
	}
	return todo;
};

export const deleteTodo = (id: string): void => {
	todos = todos.filter((todo) => todo.id !== id);
};
