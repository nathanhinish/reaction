import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Wishlist: "reaction/wishlist",
  WishlistItem: "reaction/wishlist-item"
};

export const encodeWishlistOpaqueId = encodeOpaqueId(namespaces.Wishlist);
export const encodeWishlistItemOpaqueId = encodeOpaqueId(namespaces.WishlistItem);

export const decodeWishlistOpaqueId = decodeOpaqueIdForNamespace(namespaces.Wishlist);
export const decodeWishlistItemOpaqueId = decodeOpaqueIdForNamespace(namespaces.WishlistItem);
