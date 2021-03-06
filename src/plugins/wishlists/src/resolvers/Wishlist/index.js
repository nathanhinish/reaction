import { encodeWishlistOpaqueId } from "../../xforms/id.js";

export default {
  _id: (node) => encodeWishlistOpaqueId(node._id),
  entries: (node) => node.entries,
  name: (node) => node.name,
  permalink: (node) => node.permalink,
  isVisible: (node) => node.isVisible,
  description: (node) => node.description
};
