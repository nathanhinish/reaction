import { decodeWishlistOpaqueId, decodeWishlistEntryOpaqueId } from "../../xforms/id.js";

/**
*
* @method archiveWishlistEntries
* @summary Takes an array of variant IDs and archives variants
* @param {Object} _ - unused
* @param {Object} args - The input arguments
* @param {Object} args.input - mutation input object
* @param {String} args.input.shopId - shop these variants belong to
* @param {String} args.input.variantIds - an array of variant IDs to archive
* @param {Object} context - an object containing the per-request state
* @return {Array} array with archived variants
*/
export default async function archiveWishlistEntries(_, { input }, context) {
  const {
    clientMutationId,
    entryIds
  } = input;

  // TODO
  const archivedEntries = [];
  return {
    clientMutationId,
    entries: archivedEntries
  };
}
