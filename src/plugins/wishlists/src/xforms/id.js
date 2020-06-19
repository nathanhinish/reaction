import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Wishlist: "givelist/wishlist",
  WishlistEntry: "givelist/wishlist-entry"
};

export const encodeWishlistOpaqueId = encodeOpaqueId(namespaces.Wishlist);
export const encodeWishlistEntryOpaqueId = encodeOpaqueId(namespaces.WishlistEntry);

export const decodeWishlistOpaqueId = decodeOpaqueIdForNamespace(namespaces.Wishlist);
export const decodeWishlistEntryOpaqueId = decodeOpaqueIdForNamespace(namespaces.WishlistEntry);
