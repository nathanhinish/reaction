import getSlug from "@reactioncommerce/api-utils/getSlug.js";
import createHandle from "./createHandle.js";

const wishlistFieldsThatShouldNotBeDirectlySet = [
  "_id",
  "ancestors",
  "createdAt",
  "currentWishlistHash",
  "parcel",
  "publishedAt",
  "publishedWishlistHash",
  "shopId",
  "type",
  "workflow"
];

export default async function cleanWishlistInput(context, {
  currentWishlistHandle,
  wishlistId,
  wishlistInput
}) {
  const input = { ...wishlistInput };

  if (typeof input.title === "string" && !currentWishlistHandle && !input.handle) {
    input.handle = await createHandle(context, getSlug(input.title), wishlistId, shopId);
  }

  wishlistFieldsThatShouldNotBeDirectlySet.forEach((forbiddenField) => {
    delete input[forbiddenField];
  });

  return input;
}
