<script lang="ts">
  import { tableData, statusData, selectedWebhook, showCreateModal, notificationMessage } from "../store/store";
  import dots from '../assets/Dots.svg'

  export let activeTab: "configuration" | "statuses";

  let showMenu = null; 
  let selectedRow = null;

  function editWebhook(webhook) {
    selectedWebhook.set(webhook);
    showCreateModal.set(true);
    showMenu = null;  
  }

  function deleteWebhook(id: number) {
    if (activeTab === "configuration") {
      tableData.update(currentData => currentData.filter(w => w.id !== id));
    } else {
      statusData.update(currentData => currentData.filter(w => w.id !== id));
    }
    showMenu = null;  
    notificationMessage.set("Webhook removed!"); 
  }

  let columns = [];
  let data = [];

  $: if (activeTab === "configuration") {
    columns = ["Nickname", "Webhook URL", "Create Date", "Last Modified", "Authorization Type"];
    data = $tableData;
  } else {
    columns = ["Create Date", "HTTP Code", "Failures", "Status", "Message", "Last Try", "Next Try"];
    data = $statusData;
  }
</script>

<table>
  <thead>
    <tr>
      {#each columns as column}
        <th>{column}</th>
      {/each}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data as row (row.id || row.createDate)} 
      <tr>
        {#if activeTab === "configuration"}
          <td>{row.nickname}</td>
          <td>{row.url}</td>
          <td>{row.createdAt}</td>
          <td>{row.modifiedAt}</td>
          <td>{row.authorization}</td>
        {:else}
          <td>{row.createDate}</td>
          <td>{row.httpCode}</td>
          <td>{row.failures}</td>
          <td>{row.status}</td>
          <td>{row.message}</td>
          <td>{row.lastTry}</td>
          <td>{row.nextTry}</td>
        {/if}
        <td class="actions">
          {#if activeTab === "configuration"}
            <div class="three-dots" on:click={() => showMenu = showMenu === row ? null : row}>
              <img src={dots}>
            </div>
            {#if showMenu === row}
              <div class="dropdown-menu">
                <button on:click={() => editWebhook(row)}>Edit</button>
                <button on:click={() => deleteWebhook(row.id)}>Delete</button>
              </div>
            {/if}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th, td {
    padding: 10px;
    border-bottom: 1px solid #E8E8E8;
  }

  td {
    color: #2E2E2E;
  }

  th {
    background-color: #f8f8f8;
    text-align: left;
    color: #8B8B8B;
  }

  .three-dots {
    cursor: pointer;
    font-size: 24px;  
    text-align: center;
    width: 20px;
    height: 20px;
    margin-right: 10px; 
  }

  .dropdown-menu {
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 5px;
    margin-top: 5px;  
    z-index: 10;
    min-width: 120px;
    display: flex;
    flex-direction: column; 
  }

  .dropdown-menu button {
    background: none;
    border: none;
    padding: 10px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
  }

  .dropdown-menu button:hover {
    background-color: #f0f0f0;
  }

  .actions {
    position: relative;  
  }

  tr {
    position: relative;
  }
</style>
