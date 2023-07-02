import { NextRequest, NextResponse } from 'next/server';
import { callChatGPTClient } from '@/backend/openAPIClient';
import { HttpStatusCodes } from '@/app/backend/response';

let limit = 5;

const GET = async (req: NextRequest) => {
	const promptText = req?.nextUrl?.searchParams?.get?.('promptText') ?? '';
	console.log(promptText);
	if (limit <= 0 || !promptText)
		return NextResponse.json([], {
			status: 429,
			statusText:
				'Reached maximum API invocations. Please Upgrade service to keep using content.',
		});
	limit--;
	return callChatGPTClient(promptText)
		.then((res) => NextResponse.json(res))
		.catch((err) =>
			NextResponse.json([], {
				status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
				statusText: err.message,
			})
		);
};

export { GET };
