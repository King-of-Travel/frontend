<button
  {title}
  on:click="{changeRating}"
  disabled="{!user}"
  class:active="{likes.currentUserRating}"
  class="button"
>
  <Icon name="heart" size="19" />
  <span>{likes.count}</span>
</button>

<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { request } from 'api.js';

  import Icon from 'components/icon.svelte';

  let { likes, id: articleId } = getContext('article');

  let { session } = stores();

  let user = $session.user;

  $: title = `Article rating. ${
    user
      ? likes.currentUserRating
        ? 'Click to remove like'
        : 'Click to like'
      : 'Only authorized users can like'
  } `;

  function changeRating() {
    if (likes.currentUserRating) {
      likes.currentUserRating = false;
      likes.count--;
    } else {
      likes.currentUserRating = true;
      likes.count++;
    }

    request('PUT', `article/like?articleId=${articleId}`);
  }
</script>

<style>
  button {
    --background: transparent;
    --background-hover: var(--base-light-accent);
    --background-hover-color-text: var(--base-text);
    --background-disabled: transparent;
    display: inline-flex;
    align-items: center;
    padding: 10px;
  }

  button.active {
    --color-text: #6c9007;
    --color-text-hover: var(--base-text);
  }

  span {
    margin-left: 4px;
    font-size: var(--base-h5);
    font-weight: 600;
  }
</style>
