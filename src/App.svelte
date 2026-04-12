<script lang="ts">
  import sitesData from "./lib/data/sites.json";
  import SearchBar from "./lib/components/SearchBar.svelte";
  import GamePortalContent from "./lib/components/GamePortalContent.svelte";
  import { Button, Footer, FooterCopyright, FooterIcon } from "flowbite-svelte";
  import Heart from "@lucide/svelte/icons/heart";
  import { GithubSolid } from "flowbite-svelte-icons";
  import yaml from 'js-yaml';
  import configYaml from './lib/data/config.yaml?raw';
  import { onMount } from 'svelte';
  import { loadFavorites, saveFavorites, toggleFavorite } from './lib/utils/favorites';
  import { filterGames } from './lib/utils/search';

  interface Config {
    authorName: string;
    githubLink: string;
  }

  let config = $state<Config | null>(null);
  const { groups: initialGroups } = sitesData;

  onMount(() => {
    try {
      config = yaml.load(configYaml) as Config;
    } catch (e) {
      console.error('Failed to parse config.yaml', e);
    }
  });
  
  let searchQuery = $state("");
  let showFavoritesOnly = $state(false);
  let favorites = $state<string[]>([]);

  // Load favorites from localStorage on mount
  onMount(() => {
    favorites = loadFavorites();
  });

  // Save favorites to localStorage whenever they change
  $effect(() => {
    saveFavorites(favorites);
  });

  function onToggleFavorite(id: string) {
    favorites = toggleFavorite(favorites, id);
  }

  // Filtered data logic
  const filteredGames = $derived(
    filterGames(initialGroups, searchQuery, favorites, showFavoritesOnly)
  );

  const isSearching = $derived(searchQuery.length > 0);

  // Particle generation logic
  const particles = $state<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  onMount(() => {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 5}s`,
        size: `${2 + Math.random() * 4}px`
      });
    }
  });
</script>

<main class="min-h-screen animated-gradient-bg relative overflow-hidden">
  <div class="particles-container">
    {#each particles as particle (particle.id)}
      <div 
        class="particle" 
        style:left={particle.left} 
        style:animation-delay={particle.delay} 
        style:animation-duration={particle.duration}
        style:width={particle.size}
        style:height={particle.size}
      ></div>
    {/each}
  </div>

  <div class="max-w-2xl mx-auto relative z-10">
    <header class="px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
      <div class="flex flex-col items-center gap-4">
        <SearchBar bind:searchQuery={searchQuery} />
      </div>

      <div class="flex justify-center gap-2 mt-4 pb-4">
        <Button 
          color={showFavoritesOnly ? "primary" : "light"} 
          size="sm" 
          onclick={() => showFavoritesOnly = !showFavoritesOnly}
          class="flex items-center gap-2"
        >
          <Heart size={16} class={showFavoritesOnly ? "fill-current" : ""} />
          {showFavoritesOnly ? "Show All" : "Favorites"}
        </Button>
      </div>
    </header>

    <GamePortalContent 
      {isSearching} 
      {filteredGames} 
      {initialGroups} 
      {searchQuery} 
      {favorites}
      {onToggleFavorite}
      {showFavoritesOnly} 
    />

  </div>

  <Footer class="mt-8">
    <div class="max-w-2xl mx-auto flex justify-between items-center w-full px-4 sm:px-6 lg:px-8">
      <FooterCopyright by={config?.authorName || "Otoge Portal"} copyrightMessage="" year={new Date().getFullYear()} />
      <FooterIcon href={config?.githubLink || "#"}>
        <GithubSolid class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
      </FooterIcon>
    </div>
  </Footer>
</main>
