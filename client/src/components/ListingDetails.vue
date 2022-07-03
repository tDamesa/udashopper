<script lang="ts">
import { defineComponent } from "vue";
import { Api } from "../services/api";
import Modal from "./Modal.vue";

export default defineComponent({
  data() {
    return {
      selectedImageIndex: 0,
      isMyListing: false,
      mode: "view",
    };
  },
  props: {
    listing: { type: Object, required: true },
  },
  methods: {
    async update() {
      const token = await this.$auth0.getAccessTokenSilently();
      await Api.updateListing(this.listing as any, token);
      this.$emit('updated');
    },
    async del() {
      if (!confirm('Are you sure you want to delete this listing?')) return;
      const token = await this.$auth0.getAccessTokenSilently();
      await Api.deleteListing(this.listing.id, token);
      this.$emit('deleted');
    }
  },
  mounted() {
    this.isMyListing =
      this.$auth0.isAuthenticated.value &&
      this.$auth0.user.value.sub === this.listing.userId;
  },
  components: { Modal },
});
</script>

<template>
  <Modal>
    <template #title>
      <span v-if="mode == 'view'">{{ listing.title }} </span>
      <input v-else type="text" v-model="listing.title" />
    </template>
    <div class="details__body">
      <div class="details__images">
        <img
          class="details__selected-image"
          :src="listing.imageUrls[selectedImageIndex]"
        />
        <div class="details__image-selector">
          <img
            v-for="(image, index) in listing.imageUrls"
            :key="index"
            :src="image"
            @click="selectedImageIndex = index"
          />
        </div>
      </div>
      <div class="details__info">
        <div class="details__description">
          <div v-if="mode == 'view'">{{ listing.description }}</div>
          <textarea v-else v-model="listing.description" rows="15"></textarea>
        </div>
        <div class="details__price">
          <span v-if="mode == 'view'">${{ listing.price }}</span>
          <input v-else type="number" v-model="listing.price" />
        </div>
        <div class="details__actions" v-if="isMyListing">
          <button @click="mode = 'edit'" v-if="mode == 'view'">Edit</button>
          <button @click="update" v-else>Save</button>
          <button class="details__delete-action" @click="del" v-if="mode == 'view'">Delete</button>
        </div>
        <div class="details__actions" v-else>
          <button>Contact Seller</button>
          <button>Add to Wishlist</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.details {
  &__body {
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
  }

  &__selected-image {
    width: 100%;
  }

  &__image-selector {
    display: flex;
    gap: 0.5rem;
    height: 6rem;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 25rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__delete-action {
    background-color: #f44336;
    color: #fff;
  }
}
</style>
