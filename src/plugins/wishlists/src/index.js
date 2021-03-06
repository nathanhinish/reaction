import ramda from "ramda";
import pkg from "../package.json";
import i18n from "./i18n/index.js";
import mutations from "./mutations/index.js";
import policies from "./policies.json";
import queries from "./queries/index.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import { Wishlist, WishlistEntry } from "./simpleSchemas.js";
import hasPermission from "./utils/hasPermission.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Wishlists",
    name: "wishlists",
    version: pkg.version,
    i18n,

    collections: {
      Wishlists: {
        name: "Wishlists",
        indexes: [],
      },
    },
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
    queries,
    policies,
    simpleSchemas: {
      Wishlist,
      WishlistEntry,
    },
    functionsByType: {
      getHasPermissionFunctionForUser: [
        function wishlistPermissionCheckGen(context) {
          const hasPermissionCurried = ramda.curryN(3, hasPermission);
          return hasPermissionCurried(context);
        },
      ],
    },
  });
}
