import { NextRequest } from "next/server";
import { UserService } from "./user.service";

export class UserController {
    constructor(private readonly service: UserService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {

            case "POST": {
                const body = await req.json();
                return Response.json(await this.service.createUser(body));
            }

        }
    }
}