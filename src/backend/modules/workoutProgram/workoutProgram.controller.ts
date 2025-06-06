import { WorkoutProgramService } from "./workoutProgram.service";

export class WorkoutProgramController {
    constructor(private readonly service: WorkoutProgramService) { }

    async handle(req: Request): Promise<Response> {
        const { method } = req;

        switch (method) {
            case 'GET':
                return this.handleGet(req);

            case 'POST':
                return this.handlePost(req);

            case 'PUT':
                return this.handlePut(req);

            case 'DELETE':
                return this.handleDelete(req);

            default:
                return new Response('Method Not Allowed', { status: 405 });
        }
    }

    private async handleGet(req: Request): Promise<Response> {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const userId = url.searchParams.get('userId');
        const title = url.searchParams.get('title');

        if (id && !userId && !title) {
            return Response.json(await this.service.getWorkoutProgramById(id));
        }

        if (!id && userId && !title) {
            return Response.json(await this.service.getUserWorkoutPrograms(userId));
        }

        if (!id && userId && title) {
            return Response.json(await this.service.getUserTodaysExercises(title, userId));
        }

        return Response.json(await this.service.getAllWorkoutPrograms());
    }

    private async handlePost(req: Request): Promise<Response> {
        var entrypoint = req.url.split('/').pop();
        if (entrypoint === 'addWorkoutDay') {
            const { id, createWorkoutDayDTO } = await req.json();
            return Response.json(await this.service.addWorkoutDay(id, createWorkoutDayDTO));
        }

        const body = await req.json();
        return Response.json(await this.service.createWorkoutProgram(body));
    }

    private async handlePut(req: Request): Promise<Response> {
        const update = await req.json();
        return Response.json(await this.service.updateWorkoutProgram(update));
    }

    private async handleDelete(req: Request): Promise<Response> {
        const { id } = await req.json();
        return Response.json(await this.service.deleteWorkoutProgram(id));
    }
}
