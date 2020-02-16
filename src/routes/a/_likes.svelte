<button
  {title}
  on:click="{changeRating}"
  disabled="{!user}"
  class:active="{likes.currentUserRating}"
  class="button"
>
  <Icon size="19">
    <HeartIcon />
  </Icon>
  <span>{likes.count}</span>
</button>

<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { request } from 'api.js';

  import Icon from 'components/icon.svelte';
  import HeartIcon from 'components/icons/heart.svelte';

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
    display: inline-flex;
    align-items: center;
    padding: 10px;
    background: transparent;
  }

  button.active {
    color: #6c9007;
  }

  button:focus,
  button:hover {
    background: var(--base-light-accent);
    color: var(--base-text);
  }

  button:disabled {
    background: transparent;
  }

  span {
    margin-left: 4px;
    font-size: var(--base-h5);
    font-weight: 600;
  }
</style>
