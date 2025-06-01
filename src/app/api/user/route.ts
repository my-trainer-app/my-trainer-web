import { container } from '@/backend/lib/ioc/container';
import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json('Unauthorized', { status: 401 })
    }
    return container.userController.handle(req);
}

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json('Unauthorized', { status: 401 })
    }
    return container.userController.handle(req);
}

export async function PUT(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json('Unauthorized', { status: 401 })
    }
    return container.userController.handle(req);
}

export async function DELETE(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json('Unauthorized', { status: 401 })
    }
    return container.userController.handle(req);
}
