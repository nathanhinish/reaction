import applyWishlistFilters from "../utils/applyWishlistFilters.js";

/**
 * @name wishlists
 * @method
 * @memberof GraphQL/Wishlists
 * @summary Query the Wishlists collection for a list of wishlists
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {Boolean} [isArchived] - Filter by archived
 * @param {Boolean} [isVisible] - Filter by visibility
 * @param {String} [metafieldKey] - Filter by metafield key
 * @param {String} [metafieldValue] - Filter by metafield value
 * @param {Number} [priceMax] - Filter by price range maximum value
 * @param {Number} [priceMin] - Filter by price range minimum value
 * @param {String[]} [wishlistIds] - List of wishlist IDs to filter by
 * @param {String} [query] - Regex match query string
 * @param {String[]} shopIds - List of shop IDs to filter by
 * @param {String[]} [tagIds] - List of tag ids to filter by
 * @returns {Promise<Object>} Wishlists object Promise
 */
export default async function wishlists(context, input) {
  const { collections } = context;
  const { Wishlists } = collections;
  const wishlistFilters = input;

  // Create the mongo selector from the filters
  const selector = applyWishlistFilters(context, wishlistFilters);

  // Get the first N (limit) top-level wishlists that match the query
  return Wishlists.find(selector);
}
