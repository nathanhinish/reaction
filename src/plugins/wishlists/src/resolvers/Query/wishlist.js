import { decodeWishlistOpaqueId } from "../../xforms/id.js";

/**
 * @name Query/wishlist
 * @method
 * @memberof Wishlist/Query
 * @summary query the Wishlists collection for a single wishlist
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.wishlistId - Wishlist id
 * @param {String} args.shopId - Shop id of the wishlist
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} Wishlists
 */
export default async function wishlist(_, args, context) {
  const {
    wishlistId: opaqueWishlistId
  } = args;

  const wishlistId = decodeWishlistOpaqueId(opaqueWishlistId);

  return context.queries.wishlist(context, {
    wishlistId,
  });
}
