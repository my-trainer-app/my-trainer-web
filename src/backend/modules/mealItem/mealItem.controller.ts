import { NextRequest } from 'next/server';
import { MealItemService } from './mealItem.service';

export class MealItemController {
    constructor(private readonly service: MealItemService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {
            case 'GET':
                {
                    const id = req.nextUrl.searchParams.get('id');
                    if (id) return Response.json(await this.service.getMealItemById(id));
                    return Response.json(await this.service.getAllMealItems());
                }
            case 'POST':
                const body = await req.json();
                return Response.json(await this.service.createMealItem(body));
            case 'PUT':
                const update = await req.json();
                return Response.json(await this.service.updateMealItem(update));
            case 'DELETE':
                const { id } = await req.json();
                return Response.json(await this.service.deleteMealItem(id));
            default:
                return new Response('Method Not Allowed', { status: 405 });
        }
    }
}
