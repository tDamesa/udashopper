import { AddListingRequest, Listing } from "../types";
import { CreateListingResult } from "../types";

export class Api {
  static async fileUpload(uploadUrls: string[], images: any): Promise<void> {
    await Promise.all(
      uploadUrls.map((uploadUrl, index) =>
        fetch(uploadUrl, {
          method: "PUT",
          body: images[index],
        })
      )
    );
  }

  static async getListings() {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/listings`);
    return await result.json();
  }

  static async getMyListings(token: string) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/my-listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await result.json();
  }

  static async createListing(listing: AddListingRequest, token: string): Promise<CreateListingResult> {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/listings/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(listing),
    });
    return await result.json();
  }

  static async updateListing(listing: Listing, token: string) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/listings/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(listing),
    });
    return await result.json();
  }

  static async deleteListing(id: string, token: string) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/listings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    return await result.json();
  }
}
