import { signUp } from '@/app/backend/authClient';
import { NextRequest, NextResponse } from 'next/server';

const POST = async (req: NextRequest) => {
	const reqBody = await req.json();
	const { body, init } = await signUp(reqBody);
    return NextResponse.json(body ?? null, init);
};

export { POST };
