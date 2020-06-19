import SimpleSchema from "simpl-schema";
import { Account } from "@reactioncommerce/api-plugin-accounts/src/simpleSchemas.js";

export const WishlistEntry = new SimpleSchema({
  _id: {
    type: String,
    label: "Wishlist entry ID",
  },

  comment: String,

  priority: {
    type: String,
    allowedValues: ["HIGHEST", "HIGH", "MEDIUM", "LOW", "LOWEST"],
  },
  quantityDesired: Number,
  quantityReceived: Number,
  createdAt: Date,
  updatedAt: Date,
  isArchived: Boolean,
});

export const Wishlist = new SimpleSchema({
  _id: {
    type: String,
    label: "Wishlist ID",
  },

  entries: [WishlistEntry],
  account: Account,

  createdAt: Date,
  updatedAt: Date,

  name: String,
  description: String,
  isArchived: Boolean,
  isVisible: Boolean,
});
