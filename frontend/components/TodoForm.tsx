"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { createTodo } from "@/store/todoSlice";
import { AppDispatch } from "@/store/store";

export function TodoForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      await dispatch(createTodo({ title: title.trim(), description: description.trim() }));
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo description"
          className="w-full"
        />
      </div>
      <Button type="submit" disabled={!title.trim() || !description.trim()} className="w-full">
        <PlusCircle className="h-5 w-5 mr-2" />
        Add Todo
      </Button>
    </form>
  );
}