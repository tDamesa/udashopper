<script lang="ts">
import { defineComponent } from "vue";
import { Api } from "../services/api";
import {Listing } from "../types";
import ListingDetails from "./ListingDetails.vue";
import AddListing from "./AddListing.vue";

export default defineComponent({
  data() {
    return {
      filter: "all",
      listings: [] as Listing[],
      selectedListingIndex: null as number | null,
      addingListing: false,
    };
  },
  methods: {
    async getListings() {
      this.filter = "all";
      this.listings = await Api.getListings();
    },
    async getMyListings() {
      this.filter = "my";
      if (!this.$auth0.isAuthenticated.value) {
        this.listings = [];
        return;
      }
      const token = await this.$auth0.getAccessTokenSilently();
      this.listings = await Api.getMyListings(token);
    },
    async removeListing() {
      this.listings.splice(this.selectedListingIndex!, 1);
      this.selectedListingIndex = null;
    },
    addListing(listing: Listing) {
      this.listings.push(listing);
      this.addingListing = false;
    },
  },
  async mounted() {
    await this.getListings();
  },
  components: { ListingDetails, AddListing },
});
</script>

<template>
  <div class="listing">
    <div class="listing__header">
      <div class="listing__count-info">
        Total {{ listings.length }} products found
      </div>
      <div class="listing__filter">
        <a
          class="listing__filter-toggle"
          :class="{ 'listing__filter-toggle--active': filter == 'all' }"
          @click="getListings()"
          >All Items</a
        >
        <a
          class="listing__filter-toggle"
          :class="{ 'listing__filter-toggle--active': filter == 'my' }"
          @click="getMyListings()"
          >My Listing</a
        >
      </div>
    </div>
    <div class="listing__items">
      <a
        class="listing__item"
        v-for="(listing, index) in listings"
        :key="listing.id"
        @click="selectedListingIndex = index"
      >
        <img
          class="listing__item-image"
          :src="listing.imageUrls?.[0]"
          :alt="listing.title"
        />
        <div class="listing__item-info">
          <div class="listing__item-title">
            {{ listing.title }}
          </div>
          <div class="listing__item-price">{{ listing.price }}</div>
        </div>
      </a>
    </div>
    <div class="listing__add" v-if="filter == 'my'">
      <button v-if="$auth0.isAuthenticated.value" @click="addingListing = true">
        Add a new listing
      </button>
      <button v-else @click="$auth0.loginWithRedirect">
        Login to add a your listing
      </button>
    </div>
    <ListingDetails
      v-if="selectedListingIndex != null"
      :listing="listings[selectedListingIndex]"
      @closed="selectedListingIndex = null"
      @updated="selectedListingIndex = null"
      @deleted="removeListing()"
    />
    <AddListing v-if="addingListing" @closed="addingListing = false" @added="addListing"/>
  </div>
</template>

<style scoped lang="scss">
.listing {
  padding: 2rem 2rem;

  &__filter {
    background-color: #2a2a2a;
    border-radius: 2rem;
  }

  &__filter-toggle {
    display: inline-block;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &--active {
      background-color: #f9f9f9;
      color: #000;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  &__items {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  &__item-image {
    width: 300px;
  }

  &__item-info {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  &__add {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
}
</style>
