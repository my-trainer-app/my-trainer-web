// hooks/useExercises.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise,
    Exercise
} from '@/client/services/exerciseService';

export const useExercises = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['exercises'],
        queryFn: getExercises
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

    return { query, create, update, remove };
};
