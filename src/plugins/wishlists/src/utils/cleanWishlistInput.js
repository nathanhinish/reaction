import getSlug from "@reactioncommerce/api-utils/getSlug.js";
import createHandle from "./createHandle.js";

const wishlistFieldsThatShouldNotBeDirectlySet = ["_id", "entries", "createdAt"];

export default async function cleanWishlistInput(context, { currentWishlistHandle, wishlistId, wishlistInput }) {
  const input = { ...wishlistInput };

  if (typeof input.name === "string" && !currentWishlistHandle && !input.permalink) {
    input.permalink = await createHandle(context, getSlug(input.name), wishlistId);
  }

  wishlistFieldsThatShouldNotBeDirectlySet.forEach((forbiddenField) => {
    delete input[forbiddenField];
  });

  return input;
}
