import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createProfile } from '../services/profileService';

export const useProfile = () => {
    const queryClient = useQueryClient();



    const createDbProfile = useMutation({
        mutationFn: createProfile,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    });



    return { createDbProfile };
};
