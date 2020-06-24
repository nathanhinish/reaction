/**
 * @name wishlist
 * @method
 * @memberof GraphQL/Wishlist
 * @summary Query the Wishlists collection for a single wishlist
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {String} input.wishlistId - Wishlist ID
 * @param {String} input.shopId - Shop ID
 * @returns {Promise<Object>} Wishlist object Promise
 */
export default async function wishlist(context, input) {
  const { collections } = context;
  const { Wishlists } = collections;
  const { wishlistId } = input;
  const wishlist = await Wishlists.findOne({
    _id: wishlistId,
  });

  if (!wishlist) {
    return wishlist;
  }

  await context.validatePermissions(`givelist:api-plugin-wishlists:wishlists`, "read", { owner: wishlist.owner });

  return wishlist;
}
