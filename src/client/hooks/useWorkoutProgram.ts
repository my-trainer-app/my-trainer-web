import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkoutProgram, getUserTodaysExercises, getUserWorkoutPrograms, getWorkoutProgramById, getWorkoutPrograms, addWorkoutProgramToDay, updateWorkoutProgram, deleteWorkoutProgram } from "../services/workoutProgramService";
import { WorkoutDay } from "../model/WorkoutDay";
import { WorkoutProgram } from "../model/WorkoutProgram";

export const useWorkoutProgram = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['workoutPrograms'],
        queryFn: getWorkoutPrograms
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['workoutPrograms', id],
        queryFn: () => getWorkoutProgramById(id)
    });

    const queryWithUserId = (userId: string) => useQuery({
        queryKey: ['workoutPrograms', 'user', userId],
        queryFn: () => getUserWorkoutPrograms(userId)
    });

    const queryWithUserTodaysExercises = (title: string, userId: string) => useQuery({
        queryKey: ['workoutPrograms', 'user', 'todaysExercises', title, userId],
        queryFn: () => getUserTodaysExercises(title, userId)
    });

    const create = useMutation({
        mutationFn: createWorkoutProgram,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPrograms'] }),
    });

    const addWorkoutDay = useMutation({
        mutationFn: ({ id, data }: { id: string; data: WorkoutDay }) => addWorkoutProgramToDay(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPrograms'] }),
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutProgram> }) => updateWorkoutProgram({ id, ...data }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPrograms'] }),
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteWorkoutProgram(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workoutPrograms'] }),
    });

    return {
        query,
        queryWithId,
        queryWithUserId,
        queryWithUserTodaysExercises,
        create,
        addWorkoutDay,
        update,
        remove
    };

}
