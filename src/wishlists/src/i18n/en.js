const common = {
  ns: "reaction-wishlists",
  translation: {
    "reaction-wishlists": {
      admin: {
        dashboard: {
          wishlistsLabel: "Wishlists",
        },
        wishlistTable: {
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

export default [
  {
    i18n: "en",
    ...common,
  },
  {
    i18n: "en-US",
    ...common,
  },
];
