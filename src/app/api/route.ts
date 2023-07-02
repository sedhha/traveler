import { NextRequest } from 'next/server';

const GET = (req: NextRequest) => {
	return new Response('Hello NEXT JS');
};
export { GET };
