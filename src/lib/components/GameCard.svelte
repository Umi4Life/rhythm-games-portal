<script lang="ts">
  import Heart from "@lucide/svelte/icons/heart";

  interface Game {
    id: string;
    title: string;
    logo: string;
    url: string;
    tags?: string[];
    region?: string;
  }

  let { 
    game, 
    isFavorite, 
    onToggleFavorite 
  }: { 
    game: Game, 
    isFavorite: boolean, 
    onToggleFavorite: (id: string) => void 
  } = $props();
</script>

<div class="relative flex flex-col items-center group">
  {#if game.region}
    <div class="absolute top-1 left-1 z-10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/10 text-white rounded shadow-sm">
      {game.region}
    </div>
  {/if}
  <a 
    href={game.url} 
    target="_blank" 
    rel="noopener noreferrer"
    class="w-full flex flex-col items-center group"
  >
    <div class="w-full aspect-square flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-transform duration-200 group-hover:scale-105">
      <div class="grow p-0.5 flex items-end justify-center overflow-hidden">
        <img 
          src={game.logo} 
          alt={game.title} 
          class="max-w-[95%] max-h-[90%] object-contain mb-2"
        />
      </div>
      <div class="h-8 flex items-center justify-center dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <span class="text-xs font-medium text-gray-900 dark:text-white truncate px-2">
          {game.title}
        </span>
      </div>
    </div>
  </a>

  <button 
    onclick={() => onToggleFavorite(game.id)}
    class="absolute top-1 right-1 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm transition-transform active:scale-90 hover:scale-110"
    aria-label="Toggle Favorite"
  >
    <Heart 
      size={16} 
      class={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
    />
  </button>
</div>