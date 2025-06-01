import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createUser } from '../services/userService';

export const useDbUser = () => {
    const queryClient = useQueryClient();

    const createDbUser = useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),

    });

    return { createDbUser };
};
