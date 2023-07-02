import { z } from 'zod';

const configSchema = z.object({
	SUPABASE_SERVICE_ROLE: z.string(),
	SUPABASE_PROJECT_ID: z.string(),
	ADMIN_ACCESS_TOKEN: z.string(),
});
type ConfigObjectType = z.infer<typeof configSchema>;

const config = {
	SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE,
	SUPABASE_PROJECT_ID: process.env.SUPABASE_PROJECT_ID,
	ADMIN_ACCESS_TOKEN: process.env.ADMIN_ACCESS_TOKEN,
} as ConfigObjectType;

try {
	configSchema.parse(config);
} catch (err) {
	const errors = JSON.parse((err as { message: string }).message);
	const message = errors.reduce((acc: string, curr: unknown, index: number) => {
		const currString = Object.entries(curr as Record<string, string>).reduce(
			(acc, [key, value]) => `${acc}${key}:${value},`,
			``
		);
		acc += `{${currString}}`;
		if (index === errors.length - 1) return acc + '❌❌❌\n\n';
		return acc;
	}, '❌❌❌ Unable to find configuration variables and exiting the program -');
	console.error(message);
	process.exit(1);
}

export { config };
export type { ConfigObjectType };
