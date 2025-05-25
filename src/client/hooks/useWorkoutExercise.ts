import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkoutExercise, deleteWorkoutExercise, getWorkoutExercises, getWorkoutExercisesById, updateWorkoutExercise } from "@/client/services/workoutExercise";
import { WorkoutExercise } from "@/client/model/WorkoutExercise";
export const useWorkoutExercise = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['workoutExercises'],
        queryFn: getWorkoutExercises
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['workoutExercises', id],
        queryFn: () => getWorkoutExercisesById(id)
    });

    const create = useMutation({
        mutationFn: createWorkoutExercise,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutExercises'] }),
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutExercise> }) => updateWorkoutExercise(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutExercises'] }),
    })

    const remove = useMutation({
        mutationFn: (id: string) => deleteWorkoutExercise(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutExercises'] }),
    })


    return { query, queryWithId, create, update, remove };
}