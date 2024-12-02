import axios from "axios";
import { Todo, TodoResponse, TodosListResponse } from "@/types/todo";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.apiBaseUrl;

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
