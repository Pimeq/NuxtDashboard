import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	try {
		const data = $fetch("http://127.0.0.1:5000/checkStatus", {
			method: "POST",
			mode: "no-cors",
		}).catch((err) => {
			return;
		});
		return data;
	} catch (error) {
		setResponseStatus(event, 403);
		return {
			statusCode: "403",
			message: "Not Authenticated >:[",
		};
	}
});
