import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeWishlistOpaqueId } from "../../xforms/id.js";

/**
 * @name Query/wishlists
 * @method
 * @memberof Wishlists/Query
 * @summary Query for a list of wishlists
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.shopId - id of user to query
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object>} Wishlists
 */
export default async function wishlists(_, args, context, info) {
  const {
    wishlistIds: opaqueWishlistIds,
    query: queryString,
    isArchived,
    isVisible,
    ...connectionArgs
  } = args;

  const wishlistIds = opaqueWishlistIds && opaqueWishlistIds.map(decodeWishlistOpaqueId);

  const query = await context.queries.wishlists(context, {
    wishlistIds,
    query: queryString,
    isArchived,
    isVisible
  });

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
