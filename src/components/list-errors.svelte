<ul title="Errors list">
  {#each Object.keys(errors) as key (errors[key])}
    <li>{errors[key]}</li>
  {/each}
</ul>

<script>
  export let errors;
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    margin-bottom: 10px;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--base-red);
  }
</style>
