import {  } from "../../xforms/id.js";

export default async function createWishlist(_, { input }, context) {
  const {
    clientMutationId = null,
    wishlist: wishlistInput,

  } = input;

  const wishlist = await context.mutations.createWishlist(context, {
    wishlist: wishlistInput
  });

  return {
    clientMutationId,
    wishlist
  };
}
