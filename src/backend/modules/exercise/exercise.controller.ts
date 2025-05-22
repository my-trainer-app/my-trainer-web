import { ExerciseService } from './exercise.service';
import { NextRequest } from 'next/server';

export class ExerciseController {
    constructor(private readonly service: ExerciseService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {
            case 'GET':
                return Response.json(await this.service.getAllExercises());
            case 'POST':
                const body = await req.json();
                return Response.json(await this.service.createExercise(body));
            case 'PUT':
                const update = await req.json();
                return Response.json(await this.service.updateExercise(update));
            case 'DELETE':
                const { id } = await req.json();
                return Response.json(await this.service.deleteExercise(id));
            default:
                return new Response('Method Not Allowed', { status: 405 });
        }
    }
}
