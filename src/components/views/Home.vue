<template>
  <div class="Home">
    <div class="Home__hero mb-4 mb-md-5 mx-auto text-center">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">
        {{ intro }}
      </p>
    </div>
    <div class="Home__content-blocks">
      <app-content-block
        v-for="contentBlock in contentBlocks"
        :key="contentBlock.id"
        v-bind="contentBlock"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { GET_LANDING_PAGE } from '../../store/action-types';
import { HOME } from '../../models/landing-page';
import landingPage from '../../store/modules/landing-page';

import AppContentBlock from '../app/AppContentBlock.vue';

const STORE_NAMESPACE = `landingPage/home`;

export default {
  name: `Home`,
  components: {
    AppContentBlock,
  },
  computed: {
    ...mapState(STORE_NAMESPACE, [
      `contentBlocks`,
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

  &__content-blocks {
    > :not(:last-child) {
      margin-bottom: 4em;
    }
  }
}
</style>
