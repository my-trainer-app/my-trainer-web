import { NextRequest } from "next/server";
import { WorkoutDayService } from "./workoutDay.service";

export class WorkoutDayController {
    constructor(private readonly service: WorkoutDayService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {
            case "GET": {
                const id = req.nextUrl.searchParams.get("id");
                if (id) return Response.json(await this.service.getWorkoutDayById(id));
                return Response.json(await this.service.getAllWorkoutDays());
            }
            case "POST": {
                const body = await req.json();
                return Response.json(await this.service.createWorkoutDay(body));
            }
            case "PUT": {
                const update = await req.json();
                return Response.json(await this.service.updateWorkoutDay(update));
            }
            case "DELETE": {
                const { id } = await req.json();
                return Response.json(await this.service.deleteWorkoutDay(id));
            }
        }
    }
}