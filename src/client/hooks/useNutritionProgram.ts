import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Meal } from "../model/Meal";
import { NutritionProgram } from "../model/NutritionProgram";
import { addNutritionProgramToMeal, createNutritionProgram, deleteNutritionProgram, getNutritionProgramById, getNutritionPrograms, getUserNutritionPrograms, getUserTodaysNutritions, updateNutritionProgram } from "../services/nutritionProgramService";

export const useNutritionProgram = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['nutritionProgram'],
        queryFn: getNutritionPrograms
    });

    const queryWithId = (id: string) => useQuery({
        queryKey: ['nutritionProgram', id],
        queryFn: () => getNutritionProgramById(id)
    });

    const queryWithUserId = (userId: string) => useQuery({
        queryKey: ['nutritionProgram', 'user', userId],
        queryFn: () => getUserNutritionPrograms(userId)
    });

    const queryWithUserTodaysExercises = (title: string, userId: string) => useQuery({
        queryKey: ['nutritionProgram', 'user', 'todaysExercises', title, userId],
        queryFn: () => getUserTodaysNutritions(title, userId)
    });

    const create = useMutation({
        mutationFn: createNutritionProgram,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionProgram'] }),
    });

    const addMeal = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Meal }) => addNutritionProgramToMeal(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionProgram'] }),
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<NutritionProgram> }) => updateNutritionProgram({ id, ...data }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionProgram'] }),
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteNutritionProgram(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nutritionProgram'] }),
    });

    return {
        query,
        queryWithId,
        queryWithUserId,
        queryWithUserTodaysExercises,
        create,
        addMeal,
        update,
        remove
    };

}
