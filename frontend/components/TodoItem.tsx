"use client";

import { Todo } from "@/types/todo";
import { Trash2, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteTodo, updateTodo } from "@/store/todoSlice";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      await dispatch(updateTodo({
        id: todo.id,
        data: { completed: !todo.completed }
      })).unwrap();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await dispatch(deleteTodo(todo.id)).unwrap();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            onClick={handleToggle}
            disabled={isLoading}
          >
            {todo.completed ? (
              <Check className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
          <span
            className={cn(
              "text-lg font-medium",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground pl-12">{todo.description}</p>
      <p className="text-xs text-muted-foreground pl-12">{new Date(todo.createdAt).toLocaleString()}</p>
    </div>
  );
}