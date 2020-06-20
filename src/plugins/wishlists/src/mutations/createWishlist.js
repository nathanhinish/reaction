import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import cleanWishlistInput from "../utils/cleanWishlistInput.js";

const inputSchema = new SimpleSchema({
  wishlist: {
    type: Object,
    blackbox: true,
    optional: true
  },
});

export default async function createWishlist(context, input) {
  inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Wishlist } = simpleSchemas;
  const { Wishlists } = collections;
  const { wishlist: wishlistInput } = input;

  const newWishlistId = (wishlistInput && wishlistInput._id) || Random.id();

  const initialWishlistData = await cleanWishlistInput(context, {
    wishlistId: newWishlistId,
    wishlistInput,
  });

  if (initialWishlistData.isArchived) {
    throw new ReactionError("invalid-param", "Creating an archived wishlist is not allowed");
  }

  const createdAt = new Date();
  const newWishlist = {
    _id: newWishlistId,
    entries: [],

    createdAt,
    isArchived: false,
    isVisible: false,

    name: `Wishlist ${newWishlistId}`,
    description: "",
    permalink: `wishlist-${newWishlistId}`,
    ...initialWishlistData,
  };

  // Apply custom transformations from plugins.
  for (const customFunc of context.getFunctionsOfType("mutateNewWishlistBeforeCreate")) {
    // Functions of type "mutateNewWishlistBeforeCreate" are expected to mutate the provided variant.
    // We need to run each of these functions in a series, rather than in parallel, because
    // we are mutating the same object on each pass.
    // eslint-disable-next-line no-await-in-loop
    await customFunc(newWishlist, { context });
  }

  Wishlist.validate(newWishlist);

  await Wishlists.insertOne(newWishlist);

  await appEvents.emit("afterWishlistCreate", { wishlist: newWishlist });

  return newWishlist;
}
