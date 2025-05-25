// hooks/useExercises.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise,
    getExerciseById,
} from '@/client/services/exerciseService';
import { Exercise } from '../model/Exercise';

export const useExercises = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['exercises'],
        queryFn: getExercises
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['exercises', id],
        queryFn: () => getExerciseById(id)
    });

    const create = useMutation({
        mutationFn: createExercise,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exercises'] }),
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Exercise> }) => updateExercise(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exercises'] }),
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteExercise(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exercises'] }),
    });

    return { query, queryWithId, create, update, remove };
};
