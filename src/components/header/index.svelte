<Desktop {user} />
<Mobile {user} />

<script>
  import { stores } from '@sapper/app';

  import Desktop from './desktop.svelte';
  import Mobile from './mobile.svelte';

  let { session } = stores();

  $: user = $session.user;
</script>
