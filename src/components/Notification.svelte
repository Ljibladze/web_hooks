<script lang="ts">
  import { notificationMessage } from "../store/store";

  let show = false;

  $: if ($notificationMessage) {
    show = true;
    setTimeout(() => {
      show = false;
      notificationMessage.set("");
    }, 3000);
  }
</script>

{#if show}
  <div class="notification">
    {$notificationMessage}
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    align-items: center;
    top: 20px;
    right: 20px;
    background: #000;
    color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-out;
    
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
