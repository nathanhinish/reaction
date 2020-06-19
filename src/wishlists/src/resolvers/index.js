import getConnectionTypeResolvers from "@reactioncommerce/api-utils/graphql/getConnectionTypeResolvers.js";
import WishlistConfiguration from "./WishlistConfiguration.js";
import Mutation from "./Mutation/index.js";
import Query from "./Query/index.js";
import Wishlist from "./Wishlist/index.js";
import WishlistEntry from "./WishlistEntry/index.js";

export default {
  WishlistConfiguration,
  Mutation,
  Query,
  Wishlist,
  WishlistEntry,
  ...getConnectionTypeResolvers("Wishlist")
};
