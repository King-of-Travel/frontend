<ul title="Errors list">
  {#each Object.keys(errors) as key}
    <li>{errors[key]}</li>
  {/each}
</ul>

<script>
  export let errors;
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 10px;
    font-size: var(--base-h6);
    font-weight: 700;
    color: var(--base-red);
  }
</style>
