<template>
  <div class="Home">
    <div class="Home__hero mb-4 mb-md-5 mx-auto text-center">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">
        {{ intro }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { GET_LANDING_PAGE } from '../../store/action-types';
import { HOME } from '../../models/landing-page';
import landingPage from '../../store/modules/landing-page';

const STORE_NAMESPACE = `landingPage/home`;

export default {
  name: `Home`,
  computed: {
    ...mapState(STORE_NAMESPACE, [
      `intro`,
      `title`,
    ]),
  },
  created() {
    // Dynamically register the landing page store module in
    // a custom namespace which is only used by this component.
    this.$store.registerModule(STORE_NAMESPACE, landingPage);

    // Do not fetch data again if it has been fetched already.
    if (this.$store.state[STORE_NAMESPACE].id) return;

    this.getLandingPage(HOME);
  },
  methods: {
    ...mapActions(STORE_NAMESPACE, {
      getLandingPage: GET_LANDING_PAGE,
    }),
  },
};
</script>

<style lang="scss">
.Home {
  &__hero {
    max-width: 36em;
  }
}
</style>
