<template>
  <div>
    <RouterView/>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import App from './scripts/App';

export default {
  ...App
}
</script>