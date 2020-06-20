export default async function createHandle(context, wishlistHandle, wishlistId) {
  let handle = wishlistHandle || "";

  const handleCount = await context.collections.Wishlists.find({
    handle,
    _id: {
      $nin: [wishlistId]
    }
  }).count();

  let handleNumberSuffix = 0;
  let handleString = handle;
  const copySuffix = handleString.match(/-copy-\d+$/) || handleString.match(/-copy$/);

  if (copySuffix) {
    // we can have two cases here: copy-number and just -copy. If there is
    // no numbers in copySuffix then we should put 1 in handleNumberSuffix
    handleNumberSuffix = +String(copySuffix).match(/\d+$/) || 1;
    // removing last numbers and last "-" if it presents
    handleString = handle.replace(/\d+$/, "").replace(/-$/, "");
  }

  if (handleCount > 0) {
    if (handleNumberSuffix > 0) {
      handle = `${handleString}-${handleNumberSuffix + handleCount}`;
    } else {
      // first copy will be "...-copy", second: "...-copy-2"
      handle = `${handleString}-copy${handleCount > 1 ? `-${handleCount}` : ""}`;
    }
  }

  const existingWishlistWithSameSlug = await context.collections.Wishlists.findOne({
    handle,
    _id: {
      $nin: [wishlistId]
    }
  }, {
    projection: {
      _id: 1
    }
  });

  if (existingWishlistWithSameSlug) {
    handle = createHandle(context, handle, wishlistId);
  }

  return handle;
}
