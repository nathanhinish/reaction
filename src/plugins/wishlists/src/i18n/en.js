const common = {
  ns: "reaction-wishlists",
  translation: {
    "reaction-wishlists": {
      admin: {
        wishlists: 'Wishlists',
        createWishlist: 'Create wishlist',
        dashboard: {
          wishlistsLabel: "Wishlists",
        },
        wishlistTable: {
          filters: {
            placeholder: 'Filter wishlists'
          },
          bulkActions: {
            makePublic: 'Make public',
            makePrivate: 'Make private',
            duplicate: 'Duplicate',
            archive: 'Archive'
          },
          header: {
            wishlist: "Label",
            id: "ID",
            visible: "Public?",
          },
        },
      },
    },
  },
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default [
  {
    i18n: "en",
    ...deepClone(common),
  },
  {
    i18n: "en-US",
    ...deepClone(common),
  },
];
