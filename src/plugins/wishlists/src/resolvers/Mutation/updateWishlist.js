import { decodeWishlistOpaqueId } from "../../xforms/id.js";

/**
 *
 * @method updateWishlist
 * @summary Updates various wishlist fields
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} args.input.clientMutationId - The mutation id
 * @param {String} args.input.wishlist - wishlist fields to update
 * @param {String} args.input.wishlistId - wishlistId of wishlist to update
 * @param {String} args.input.shopId - shopId of shop wishlist belongs to
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} updateWishlist payload
 */
export default async function updateWishlist(_, { input }, context) {
  const {
    clientMutationId = null,
    wishlist: wishlistInput,
    wishlistId
  } = input;

  const updatedWishlist = await context.mutations.updateWishlist(context, {
    wishlist: wishlistInput,
    wishlistId: decodeWishlistOpaqueId(wishlistId)
  });

  return {
    clientMutationId,
    wishlist: updatedWishlist
  };
}
