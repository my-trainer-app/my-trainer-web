"use client";

import { useExercises } from "@/client/hooks/useExercises";
import { useState } from "react";

export default function ExerciseList() {
  const { query, create, update, remove } = useExercises();
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  if (query.isLoading) return <p>Yükleniyor...</p>;
  if (query.error) return <p>Hata: {(query.error as any).message}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Egzersiz Listesi</h2>

      <ul className="space-y-2">
        {query.data?.map((ex) => (
          <li
            key={ex.id}
            className="flex flex-row border p-2 rounded"
                onDoubleClick={() => {
                
              update.mutate({
                id: ex.id,
                data: { name: ex.name + " (güncellendi)" },
              });
            }}
          >
            <strong>{ex.name} - </strong>
            <span> {ex.description}</span>
            <button
              onClick={() => remove.mutate(ex.id)}
              className="ml-4 text-red-500 hover:underline"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-x-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded"
          placeholder="Yeni egzersiz adı"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-2 rounded"
          placeholder="Yeni egzersiz adı"
        />
        <button
          onClick={() => {
            if (newName.trim() && newDescription.trim())
              create.mutate({ name: newName, description: newDescription });
            setNewName("");
            setNewDescription("");
          }}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}
