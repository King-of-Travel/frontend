<svg
  {viewBox}
  width="{size}"
  height="{size}"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="{color}"
  stroke-width="2"
  stroke-linecap="round"
>
  <slot></slot>
</svg>

<script>
  export let size = 24,
    color = 'currentColor',
    viewBox = '0 0 24 24';
</script>
