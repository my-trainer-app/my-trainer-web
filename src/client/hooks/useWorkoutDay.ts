import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkoutDay, deleteWorkoutDay, getWorkoutDayById, getWorkoutDays, updateWorkoutDay } from "../services/workoutDayServices";
import { WorkoutDay } from "@/client/model/WorkoutDay";

export const useWorkoutDay = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['workoutDays'],
        queryFn: getWorkoutDays
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['workoutDays', id],
        queryFn: () => getWorkoutDayById(id),
    });

    const create = useMutation({
        mutationFn: createWorkoutDay,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutDays'] }),
    })

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutDay> }) => updateWorkoutDay(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutDays'] }),
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteWorkoutDay(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutDays'] }),
    })

    return { query, queryWithId, create, update, remove };
}
