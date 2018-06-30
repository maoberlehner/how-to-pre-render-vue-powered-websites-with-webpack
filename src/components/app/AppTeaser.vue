<template>
  <div class="AppTeaser card">
    <img
      :src="imageSrc"
      :srcset="imageSrcset"
      class="card-img-top"
    >
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ text }}</p>
      <a
        :href="link"
        class="btn btn-primary"
      >
        Read more
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: `AppTeaser`,
  props: {
    image: {
      type: Object,
      default: null,
    },
    link: {
      type: String,
      default: ``,
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      if (!this.image) return null;
      return `${this.image.url}?w=256&h=160&fit=thumb&fm=jpg&fl=progressive&q=70`;
    },
    imageSrcset() {
      if (!this.image) return null;
      return `${this.image.url}?w=512&h=320&fit=thumb&fm=jpg&fl=progressive&q=40 2x`;
    },
  },
};
</script>
