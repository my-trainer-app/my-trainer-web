import { NextRequest } from 'next/server';
import { WorkoutExerciseService } from './workoutExercise.service';

export class WorkoutExerciseController {
    constructor(private readonly service: WorkoutExerciseService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {
            case 'GET':
                {
                    const id = req.nextUrl.searchParams.get('id');
                    if (id) return Response.json(await this.service.getWorkoutExerciseById(id));
                    return Response.json(await this.service.getAllWorkoutExercises());
                }
            case 'POST':
                const body = await req.json();
                return Response.json(await this.service.createWorkoutExercise(body));
            case 'PUT':
                const update = await req.json();
                return Response.json(await this.service.updateWorkoutExercise(update));
            case 'DELETE':
                const { id } = await req.json();
                return Response.json(await this.service.deleteWorkoutExercise(id));
            default:
                return new Response('Method Not Allowed', { status: 405 });
        }
    }
}
