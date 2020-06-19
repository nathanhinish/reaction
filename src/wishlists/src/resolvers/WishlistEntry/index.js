import { encodeWishlistOpaqueId } from "../../xforms/id.js";

export default {
  _id: (node) => encodeWishlistOpaqueId(node._id),
  comment: (node) => node.comment,
  priority: (node) => node.priority,
  quantityDesired: (node) => node.quantityDesired,
  quantityReceived: (node) => node.quantityReceived
};
