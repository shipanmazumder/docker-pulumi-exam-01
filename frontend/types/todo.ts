export interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
}

export interface TodoResponse {
	status: boolean;
	code: number;
	message: string;
	data: Todo;
}

export interface TodosListResponse {
	status: boolean;
	code: number;
	message: string;
	data: Todo[];
}

export interface TodoState {
	todos: Todo[];
	loading: boolean;
	error: string | null;
}
