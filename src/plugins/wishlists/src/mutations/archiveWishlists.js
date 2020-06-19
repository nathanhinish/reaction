import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";

const inputSchema = new SimpleSchema({
  "wishlistIds": Array,
  "wishlistIds.$": {
    type: String
  }
});
export default async function archiveWishlists(context, input) {
  inputSchema.validate(input);
  const { appEvents, collections, userId } = context;
  const { Wishlists } = collections;
  const { wishlistIds } = input;

  // Check to make sure all wishlists are on the same shop
  const count = await Wishlists.find({ _id: { $in: wishlistIds } }).count();
  if (count !== wishlistIds.length) throw new ReactionError("not-found", "One or more wishlists do not exist");

  // Find all wishlists that aren't archived, and all their variants variants
  const wishlistsWithEntries = await Wishlists.find({
    // Don't "archive" wishlists that are already marked archived.
    isArchived: {
      $ne: true
    },
    $or: [
      {
        _id: {
          $in: wishlistIds
        }
      },
      {
        ancestors: {
          $in: wishlistIds
        }
      }
    ]
  }).toArray();

  // Get ID's of all wishlists to archive
  const wishlistIdsToArchive = wishlistsWithVariants.map((wishlist) => wishlist._id);


  const archivedWishlists = await Promise.all(wishlistIdsToArchive.map(async (wishlistId) => {
    const { value: archivedWishlist } = await Wishlists.findOneAndUpdate(
      {
        _id: wishlistId
      },
      {
        $set: {
          isArchived: true
        }
      }, {
        returnOriginal: false
      }
    );

    appEvents.emit("afterWishlistSoftDelete", {
      wishlist: {
        ...archivedWishlist
      },
      deletedBy: userId
    });
    return archivedWishlist;
  }));

  // Return only originally supplied wishlist(s),
  // not variants and options also archived
  return archivedWishlists.filter((archivedWishlist) => wishlistIds.includes(archivedWishlist._id));
}
