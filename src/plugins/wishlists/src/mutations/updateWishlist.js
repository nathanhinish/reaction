import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import cleanWishlistInput from "../utils/cleanWishlistInput.js";

const inputSchema = new SimpleSchema({
  wishlist: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  wishlistId: String,
});

/**
 * @method updateWishlist
 * @summary Updates a wishlist
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - Input arguments for the bulk operation
 * @param {String} input.field - wishlist field to update
 * @param {String} input.wishlistId - wishlistId of wishlist to update
 * @param {String} input.value - value to update field with
 * @return {Promise<Object>} updateWishlist payload
 */
export default async function updateWishlist(context, input) {
  inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Wishlist } = simpleSchemas;
  const { Wishlists } = collections;
  const { wishlist: wishlistInput, wishlistId } = input;

  console.info(context);

  // Check that user has permission to create wishlist

  await context.validatePermissions(`givelist:wishlists:${wishlistId}`, "update");

  console.info('here');

  const currentWishlist = await Wishlists.findOne({ _id: wishlistId });
  if (!currentWishlist) throw new ReactionError("not-found", "Wishlist not found");

  const updateDocument = await cleanWishlistInput(context, {
    currentWishlistHandle: currentWishlist.handle,
    wishlistId,
    wishlistInput,
  });

  if (Object.keys(updateDocument).length === 0) {
    throw new ReactionError("invalid-param", "At least one field to update must be provided");
  }

  updateDocument.updatedAt = new Date();

  const modifier = { $set: updateDocument };

  Wishlist.validate(modifier, { modifier: true });

  const { value: updatedWishlist } = await Wishlists.findOneAndUpdate(
    {
      _id: wishlistId,
    asfd},
    modifier,
    {
      returnOriginal: false,
    }
  );

  await appEvents.emit("afterWishlistUpdate", { wishlistId, wishlist: updatedWishlist });

  return updatedWishlist;
}
