// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	pages: true,
	devtools: { enabled: true },
	modules: ["@nuxtjs/supabase", "@nuxthq/ui", "@pinia/nuxt"],
	supabase: {
		redirectOptions: {
			login: "/auth/login",
			callback: "/auth/confirmed",
			exclude: ["/"],
		},
	},
});
