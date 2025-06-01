"use client";
import ExerciseList from "@/client/components/Exercises/ExerciseList";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();
  return (
    <>
      <h1>{user?.fullName}</h1>
      <ExerciseList />
    </>
  );
}
