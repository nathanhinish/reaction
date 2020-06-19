import SimpleSchema from "simpl-schema";

const filters = new SimpleSchema({
  wishlistIds: {
    type: Array,
    optional: true,
  },
  "wishlistIds.$": String,
  query: {
    type: String,
    optional: true,
  },
  isArchived: {
    type: Boolean,
    optional: true,
  },
  isVisible: {
    type: Boolean,
    optional: true,
  },
});

/**
 * @name applyWishlistFilters
 * @summary Builds a selector for Wishlists collection, given a set of filters
 * @private
 * @param {Object} context - an object containing the per-request state
 * @param {Object} wishlistFilters - See filters schema above
 * @returns {Object} Selector
 */
export default function applyWishlistFilters(context, wishlistFilters) {
  // if there are filter/params that don't match the schema
  filters.validate(wishlistFilters);

  // Init default selector - Everyone can see wishlists that fit this selector
  let selector = {
    ancestors: [], // Lookup top-level wishlists
    isDeleted: { $ne: true }, // by default, we don't publish deleted wishlists
  };

  if (wishlistFilters) {
    // filter by wishlistIds
    if (wishlistFilters.wishlistIds) {
      selector = {
        ...selector,
        _id: {
          $in: wishlistFilters.wishlistIds,
        },
      };
    }

    // filter by query
    if (wishlistFilters.query) {
      const cond = {
        $regex: wishlistFilters.query,
        $options: "i",
      };
      selector = {
        ...selector,
        $or: [
          {
            title: cond,
          },
          {
            pageTitle: cond,
          },
          {
            description: cond,
          },
        ],
      };
    }

    // filter by archived
    if (wishlistFilters.isArchived !== undefined) {
      selector = {
        ...selector,
        isDeleted: wishlistFilters.isArchived,
      };
    }
  } // end if wishlistFilters

  return selector;
}
