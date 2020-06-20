import SimpleSchema from "simpl-schema";
import { Account } from "@reactioncommerce/api-plugin-accounts/src/simpleSchemas.js";

export const WishlistEntry = new SimpleSchema({
  _id: {
    type: String,
    label: "Wishlist entry ID",
  },

  comment: {
    type: String,
    optional: true,
  },

  priority: {
    type: String,
    allowedValues: ["HIGHEST", "HIGH", "MEDIUM", "LOW", "LOWEST"],
  },
  quantityDesired: {
    type: Number,
    optional: true,
  },
  quantityReceived: Number,
  createdAt: Date,
  updatedAt: {
    type: Date,
    optional: true,
  },
  isArchived: Boolean,
});

export const Wishlist = new SimpleSchema({
  _id: {
    type: String,
    label: "Wishlist ID",
  },

  entries: [WishlistEntry],
  account: { type: Account, optional: true },

  createdAt: Date,
  updatedAt: {
    type: Date,
    optional: true,
  },

  name: String,
  permalink: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  isArchived: Boolean,
  isVisible: Boolean,
});
