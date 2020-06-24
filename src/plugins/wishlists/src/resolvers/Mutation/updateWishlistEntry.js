import { decodeWishlistOpaqueId } from "../../xforms/id.js";

export default async function updateWishlistEntry(_, { input }, context) {
  const {
    clientMutationId = null,
    entry,
    entryId,
  } = input;

  const updatedEntry = await context.mutations.updateWishlistEntry(context, {
    entryId: decodeWishlistOpaqueId(entryId),
    entry,
  });

  return {
    clientMutationId,
    entry: updatedEntry,
  };
}
