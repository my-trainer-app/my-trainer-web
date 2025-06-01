import { NextRequest } from "next/server";
import { ProfileService } from "./profile.service";

export class ProfileController {
    constructor(private readonly service: ProfileService) { }

    async handle(req: NextRequest) {
        const { method } = req;

        switch (method) {

            case "POST": {
                const body = await req.json();
                return Response.json(await this.service.createProfile(body));
            }

        }
    }
}