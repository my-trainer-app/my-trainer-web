import { container } from '@/backend/lib/ioc/container';
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
    return container.workoutProgramController.handle(req);
}

export async function POST(req: NextRequest) {
    return container.workoutProgramController.handle(req);
}

export async function PUT(req: NextRequest) {
    return container.workoutProgramController.handle(req);
}

export async function DELETE(req: NextRequest) {
    return container.workoutProgramController.handle(req);
}
