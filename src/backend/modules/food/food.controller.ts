import { FoodService } from './food.service';
import { NextRequest } from 'next/server';

export class FoodController {
    constructor(private readonly service: FoodService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {
            case 'GET':
                {
                    const id = req.nextUrl.searchParams.get('id');
                    if (id) return Response.json(await this.service.getFoodById(id));
                    return Response.json(await this.service.getAllFoods());
                }
            case 'POST':
                const body = await req.json();
                return Response.json(await this.service.createFood(body));
            case 'PUT':
                const update = await req.json();
                return Response.json(await this.service.updateFood(update));
            case 'DELETE':
                const { id } = await req.json();
                return Response.json(await this.service.deleteFood(id));
            default:
                return new Response('Method Not Allowed', { status: 405 });
        }
    }
}
