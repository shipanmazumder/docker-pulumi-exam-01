import axios from "axios";
import { Todo, TodoResponse, TodosListResponse } from "@/types/todo";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://backend/api";

export const todoApi = {
	async getAllTodos(): Promise<Todo[]> {
		const response = await axios.get<TodosListResponse>(
			`${API_BASE_URL}/todos`
		);
		return response.data.data;
	},

	async createTodo(title: string, description: string): Promise<Todo> {
		const response = await axios.post<TodoResponse>(`${API_BASE_URL}/todos`, {
			title,
			description,
		});
		return response.data.data;
	},

	async updateTodo(id: string, data: Partial<Todo>): Promise<Todo> {
		const response = await axios.put<TodoResponse>(
			`${API_BASE_URL}/todos/${id}`,
			data
		);
		return response.data.data;
	},

	async deleteTodo(id: string): Promise<void> {
		await axios.delete(`${API_BASE_URL}/todos/${id}`);
	},
};
