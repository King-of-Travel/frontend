<button
  {title}
  on:click="{changeRating}"
  disabled="{!user}"
  class:active="{likes.currentUserRating}"
  type="button"
  class="button"
>
  <Icon name="heart" size="19" />
  <span>{likes.count}</span>
</button>

<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { request } from 'request/api';

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
    display: inline-flex;
    align-items: center;
    padding: 10px;
  }

  button,
  button:disabled {
    --background: transparent;
  }

  button:not(:hover).active {
    --color-text: #6c9007;
  }

  span {
    margin-left: 4px;
    font-weight: 600;
  }
</style>
