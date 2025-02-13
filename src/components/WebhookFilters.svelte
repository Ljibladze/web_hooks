<script lang="ts">
  import { showFilterModal, selectedFilters } from "../store/store";
  import filterIcon from '../assets/Icon.svg'

  function openFilterModal() {
    showFilterModal.set(true);
  }

  function clearFilters() {
    selectedFilters.set([]);
  }
</script>

<div class="filter-container">
  <div class="search-row">
    <input type="text" class="search-input" placeholder="Search..." />
    <button class="filter-button" on:click={openFilterModal}><img src={filterIcon}> Filter</button>
  </div>

  <div class="selected-filters">
    {#each $selectedFilters as filter}
      <span class="filter-badge">
        {filter} 
        <button on:click={() => selectedFilters.set($selectedFilters.filter(f => f !== filter))}>✖</button>
      </span>
    {/each}
    {#if $selectedFilters.length > 0}
      <span class="clear-filters" on:click={clearFilters}>Clear all <span>✖</span></span>
    {/if}
  </div>
</div>

<style>
  .filter-container {
    display: flex;
    flex-direction: column; 
    width: 100%;
  }

  .search-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px; 
  }

  .selected-filters {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .filter-badge {
    background: #f0f0f0;
    padding: 5px 10px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
  }
  .clear-filters {
    background: #f0f0f0;
    padding: 5px 10px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    gap: 6px;
  }
  .filter-badge button{
    border: none;
    cursor: pointer;
    color: #747474;
    font-size: 18px;
  }
  .clear-filters span{
    border: none;
    cursor: pointer;
    color: #747474;
    font-size: 18px;
    font-weight: 500;
  }

  .search-input {
    background: url('../assets/search.svg') no-repeat left center;
    background-size: 20px 20px;
    padding: 9px 28px;
    border: 1px solid #D9D9D9;
    border-radius: 7px;
    outline: none;
}

  .filter-button {
    background: #FFFFFF;
    color: #2E2E2E;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #D9D9D9;
    
  }
</style>
