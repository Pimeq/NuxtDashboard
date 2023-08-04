<script setup lang="ts">
	const user = useSupabaseUser();
	const client = useSupabaseClient();
	const router = useRouter();

	const links = [
		{
			label: "Profile",
			avatar: {
				src: user.value?.user_metadata.picture,
			},
			badge: 100,
		},
		{
			label: "Home",
			icon: "i-heroicons-home",
			to: "/dashboard",
		},
		{
			label: "Data",
			icon: "i-heroicons-chart-bar",
			to: "/navigation/vertical-navigation",
		},
		{
			label: "Commands",
			icon: "i-heroicons-command-line",
			to: "/navigation/command-palette",
		},
	];
</script>

<template>
	<UVerticalNavigation :links="links" class="h-screen" />
</template>
