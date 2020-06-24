import Logger from "@reactioncommerce/logger";
import ReactionError from "@reactioncommerce/reaction-error";

const GLOBAL_GROUP = "__global_roles__";

export default async function hasPermission(context, resource, action, authContext) {
  const { userPermissions } = context;
  const { owner: resourceOwner, shopId } = authContext || {};

  // If the current user is the owner of a resource we are trying to check,
  // such as an order or data on a user profile, they are authorized to perform the action
  if (resourceOwner && resourceOwner === context.userId) return true;

  if (!userPermissions) return false;

  if (!resource) throw new ReactionError("invalid-param", "Resource must be provided");
  if (!action) throw new ReactionError("invalid-param", "Action must be provided");

  // Parse the provided data to create the permission name to check against (<organization>:<system>:<entity>/<action>)
  const permissionName = `${resource.split(":").splice(0, 3).join(":")}/${action}`;

  // we create an array with the provided permission
  const checkPermissions = [permissionName];

  // always check GLOBAL_GROUP
  const globalPermissions = userPermissions[GLOBAL_GROUP];
  if (Array.isArray(globalPermissions) && checkPermissions.some((permission) => globalPermissions.includes(permission)))
    return true;

  if (shopId) {
    const shopPermissions = userPermissions[shopId];
    if (Array.isArray(shopPermissions) && checkPermissions.some((permission) => shopPermissions.includes(permission)))
      return true;
  }

  Logger.debug(
    {
      requestedPermissions: checkPermissions,
      permissions: context.userPermissions,
      shopId,
      userId: context.userId,
    },
    `User ${context.userId} has none of [${checkPermissions.join(", ")}] permissions`
  );

  return false;
}
