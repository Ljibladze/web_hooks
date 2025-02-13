<script lang="ts">
  import Sidebar from "./components/Sidebar.svelte";
  import WebhookTable from "./components/WebhookTable.svelte";
  import WebhookFilters from "./components/WebhookFilters.svelte";
  import WebhookModal from "./components/WebhookModal.svelte";
  import Notification from "./components/Notification.svelte";
  import { showCreateModal, showFilterModal, selectedWebhook } from "./store/store";

  let activeTab: "configuration" | "statuses" = "configuration"; 

  function switchTab(tab: "configuration" | "statuses") {
    activeTab = tab;
  }

  function openCreateModal() {
    selectedWebhook.set(null);
    showCreateModal.set(true);
  }

  function openFilterModal() {
    showFilterModal.set(true);
  }
</script>

<div class="app-container">
  <Sidebar />

  <div class="main-content">
    <header class="top-bar">
      <div class="title">Webhooks</div>
      <button class="create-webhook" on:click={openCreateModal}>Create Webhook +</button>
    </header>

    <!-- ✅ Tabs -->
    <div class="tabs">
      <button class="{activeTab === 'configuration' ? 'active' : ''}" on:click={() => switchTab('configuration')}>Configuration</button>
      <button class="{activeTab === 'statuses' ? 'active' : ''}" on:click={() => switchTab('statuses')}>Statuses</button>
    </div>

    <WebhookFilters on:openFilter={openFilterModal} />
    <WebhookTable {activeTab} />

    {#if $showCreateModal}
      <WebhookModal mode={$selectedWebhook ? "edit" : "create"} />
    {/if}

    {#if $showFilterModal}
      <WebhookModal mode="filter" />
    {/if}

    <Notification />
  </div>
</div>

<style>
  .app-container {
    display: flex; 
    height: 100vh;
  }

  .main-content {
    flex-grow: 1; 
    padding: 20px;
    background-color: #fff;
    overflow-y: auto;
  }

  .title {
    font-weight: 700;
    font-size: 2rem;
  }
  .sidebar {
    width: 250px;
    background-color: #2d2d2d;
    color: white;
    padding: 20px;
    height: 100vh;
    position: fixed;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }

  .create-webhook {
    background-color: #FBDF56;
    color: #2E2E2E;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    border: none;
  }

  .create-webhook:hover {
    background-color: #ffd500;
  }

  .tabs {
    display: flex;
    margin-top: 10px;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
  }

  .tabs button {
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  .tabs .active {
    border-bottom: 3px solid yellow;
    font-weight: bold;
  }
</style>
