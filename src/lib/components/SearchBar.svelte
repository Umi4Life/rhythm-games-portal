<script lang="ts">
  import { Label, Input } from "flowbite-svelte";

  interface Props {
    searchQuery: string;
  }

  let { searchQuery = $bindable() }: Props = $props();
</script>

<div class="w-full max-w-md">
  <Label class="sr-only" for="search">Search games</Label>
  <Input 
    id="search"
    type="text" 
    placeholder="Search for a game..." 
    bind:value={searchQuery}
    autocomplete="off"
    class="w-full text-[16px]"
  />
</div>