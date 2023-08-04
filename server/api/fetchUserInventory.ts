import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";
import { errorMonitor } from "events";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	try {
		const activeUser = await serverSupabaseUser(event);
		//activeUser!.id == uuid

		//do the same stuff with the inventory to fetch it
		const user = await prisma.users.findFirst({
			where: {
				id: activeUser!.id,
			},
		});

		return user;
	} catch (error) {
		setResponseStatus(event, 403);
		return {
			statusCode: "403",
			message: "Not Authenticated >:[",
		};
	}
});
