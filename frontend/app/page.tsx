"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { CheckSquare } from "lucide-react";
import { AppDispatch } from "@/store/store";
import { fetchTodos } from "@/store/todoSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <CheckSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Todo App</h1>
        </div>
        
        <div className="space-y-6">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </main>
  );
}