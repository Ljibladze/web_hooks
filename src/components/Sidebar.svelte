<script lang="ts">
  import FaRegStopCircle from 'svelte-icons/fa/FaRegStopCircle.svelte'; 
  import home from '../assets/home-line.svg';
  import settings from '../assets/settings.svg';
  import code from '../assets/code.svg';
  import card from '../assets/CardType.svg';
</script>

<div class="sidebar">
  <nav>
    <ul>
      <li>
        <FaRegStopCircle class="sidebar-icon" />
      </li>
      <li><img src={home}/></li>
      <li><img src={card}/></li>
      <li><img src={settings}/></li>
      <li><img src={code}/></li>
    </ul>
  </nav>
</div>

<style>
  .sidebar {
    width: 60px;
    background: #efefef;
    padding: 20px;
  }

  .sidebar svg {
    width: 20px;  
    height: 24px; 
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
</style>
