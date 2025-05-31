import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMeal, deleteMeal, getMealById, getMeals, updateMeal } from "../services/mealService";
import { WorkoutDay } from "@/client/model/WorkoutDay";

export const useWorkoutDay = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['meal'],
        queryFn: getMeals
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['meal', id],
        queryFn: () => getMealById(id),
    });

    const create = useMutation({
        mutationFn: createMeal,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meal'] }),
    })

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutDay> }) => updateMeal(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meal'] }),
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteMeal(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['meal'] }),
    })

    return { query, queryWithId, create, update, remove };
}
