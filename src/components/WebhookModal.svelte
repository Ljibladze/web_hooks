<script lang="ts">
  import { showCreateModal, showFilterModal, selectedFilters, selectedWebhook, tableData, notificationMessage } from "../store/store";

  export let mode: "create" | "edit" | "filter";

  let nickname = "";
  let url = "";
  let authorization = "No Authorization";
  let events: string[] = [];

  let tempFilters: string[] = [...$selectedFilters];

  const availableAuthTypes = ["No Authorization", "Custom Header", "Basic Authorisation", "Bearer", "OAuth 2.0"];
  const eventOptions = [
    { name: "Pay-in", description: "Created, Pending, Declined, etc" },
    { name: "Pay-out", description: "Created, Pending, Waiting for Confirmation, etc" },
  ];

  $: if (mode === "create" && !$selectedWebhook) {
    nickname = "";
    url = "";
    authorization = "No Authorization";
    events = [];
  }
  $: if ($selectedWebhook && mode === "edit") {
    nickname = $selectedWebhook.nickname;
    url = $selectedWebhook.url;
    authorization = $selectedWebhook.authorization;
    events = [...$selectedWebhook.events];
  }

  function saveWebhook() {
    if (!nickname.trim() || !url.trim()) {
      return;
    }

    const webhook = {
      id: $selectedWebhook ? $selectedWebhook.id : Date.now(),
      nickname,
      url,
      authorization,
      events,
      createdAt: $selectedWebhook ? $selectedWebhook.createdAt : new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    tableData.update(currentData => {
      if ($selectedWebhook) {
        return currentData.map(w => (w.id === webhook.id ? webhook : w));
      } else {
        return [...currentData, webhook];
      }
    });

    showCreateModal.set(false);
    notificationMessage.set($selectedWebhook ? "Webhook updated!" : "Webhook created!"); 
  }

  function applyFilters() {
    selectedFilters.set(tempFilters);
    showFilterModal.set(false);
  }

  function clearFilters() {
    tempFilters = [];
    selectedFilters.set([]);
  }

  function closeModal() {
    showCreateModal.set(false);
    showFilterModal.set(false);
  }

  function toggleFilter(option: string) {
    if (tempFilters.includes(option)) {
      tempFilters = tempFilters.filter(f => f !== option);
    } else {
      tempFilters = [...tempFilters, option];
    }
  }
</script>

{#if mode === "filter"}
  <div class="modal-overlay" on:click|self={closeModal}>
    <div class="modal">
      <h2>Filter</h2>
      <label>Authorization Type</label>
      <div class="auth-options">
        {#each availableAuthTypes as option}
          <button class:active={tempFilters.includes(option)} on:click={() => toggleFilter(option)}>
            {option}
          </button>
        {/each}
      </div>
      <div class="filter-buttons">
        <button on:click={applyFilters} class="filter-btn">
          Apply Filters ({tempFilters.length})
        </button>
        <button on:click={clearFilters} class="filter-btn clear-btn">
          Clear Filters
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="modal-overlay" on:click|self={closeModal}>
    <div class="modal">
      <div class="modal-header">
        <h2>{mode === "edit" ? "Edit Webhook" : "Create Webhook"}</h2>
        <div class="close-btn" on:click={closeModal}>✖</div>
      </div>
      <div class="modal-body">
        <label>Nickname</label>
        <input type="text" bind:value={nickname} required />

        <label>Webhook URL</label>
        <input type="text" bind:value={url} required />

        <div class="auth-options">
          {#each availableAuthTypes as option}
            <button class:active={authorization === option} on:click={() => authorization = option}>
              {option}
            </button>
          {/each}
        </div>
        <div class="event-options">
          <label>Events to send</label>
          {#each eventOptions as event}
            <div class="event-item">
              <label class="event-checkbox">
                <input type="checkbox" bind:group={events} value={event.name} />
                <span class="event-title">{event.name}</span>
                <span class="event-description">{event.description}</span>
              </label>
            </div>
          {/each}
        </div>
      </div>
      <div class="modal-footer">
        <button class="primary-btn" on:click={saveWebhook}>{mode === "edit" ? "Save Changes" : "+ Create"}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .filter-btn {
    background: #2E2E2E;
    color: white;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
    min-width: 120px; 
  }

  .close-btn {
    cursor: pointer;  
    border: 1px solid #E6E6E6;
    padding: 5px 9px;
    border-radius: 8px;
  }

  .clear-btn {
    background-color: #fff;
    color: #000;
  }

  .modal {
    background: white;
    width: 500px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }

  .auth-options {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    border: 1px solid #E9E9E9;
    padding: 10px;
    border-radius: 6px;
  }

  .event-options {
    gap: 10px;
    flex-wrap: wrap;
    border: 1px solid #E9E9E9;
    padding: 10px;
    border-radius: 6px;
    color: #2E2E2E;
  }
  .event-options label {
    color: #000000;
    font-size: 18px;
  }

  .auth-options button {
    background: #f8f8f8;
    padding: 8px 12px;
    border-radius: 15px;
    cursor: pointer;
    border: 1px solid #D9D9D9;
  }

  .auth-options button.active {
    background: #2E2E2E;
    color: white;
  }

  .primary-btn {
    width: 100%;
    padding: 12px;
    background: #2E2E2E;
    color: white;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 10px;
  }

  .primary-btn:hover {
    background: #333;
  }

  .filter-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
</style>