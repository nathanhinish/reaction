import { decodeWishlistOpaqueId } from "../../xforms/id.js";

export default async function archiveWishlists(_, { input }, context) {
  const {
    clientMutationId,
    wishlistIds
  } = input;

  const decodedWishlistIds = wishlistIds.map((wishlistId) => decodeWishlistOpaqueId(wishlistId));

  const archivedWishlists = await context.mutations.archiveWishlists(context, {
    wishlistIds: decodedWishlistIds
  });

  return {
    clientMutationId,
    wishlists: archivedWishlists
  };
}
