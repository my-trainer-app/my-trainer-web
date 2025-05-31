// hooks/useExercises.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Food } from '../model/Food';
import { createFood, deleteFood, getFoodById, getFoods, updateFood } from '../services/foodService';

export const useFood = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['food'],
        queryFn: getFoods
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['food', id],
        queryFn: () => getFoodById(id)
    });

    const create = useMutation({
        mutationFn: createFood,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['food'] }),
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Food> }) => updateFood(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['food'] }),
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteFood(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['food'] }),
    });

    return { query, queryWithId, create, update, remove };
};
