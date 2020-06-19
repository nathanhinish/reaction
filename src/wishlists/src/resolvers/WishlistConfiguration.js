import { encodeWishlistOpaqueId } from "../xforms/id.js";

export default {
  wishlistId: (node) => encodeWishlistOpaqueId(node.wishlistId)
};
