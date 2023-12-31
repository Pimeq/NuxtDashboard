import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	try {
		const activeUser = await serverSupabaseUser(event);

		const config = await prisma.configs.findFirst({
			where: {
				user_id: activeUser?.id,
			},
		});

		return JSON.parse(
			JSON.stringify(config, (key, value) =>
				typeof value === "bigint" ? parseInt(value.toString()) : value
			)
		);
	} catch (error) {
		setResponseStatus(event, 403);
		return {
			statusCode: "403",
			message: "Not Authenticated >:[",
		};
	}
});
