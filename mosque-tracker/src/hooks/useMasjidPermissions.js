// src/hooks/useMasjidPermissions.js
export function useMasjidPermissions({
  userRole,
  userOrganizationId,
  userAssociatedMosqueId,
  masjid,
}) {
  const canEdit = () => {
    if (userRole === "system_admin") return true;
    if (userRole === "organization_admin") {
      return masjid.parent_organization_id === userOrganizationId;
    }
    if (userRole === "mosque_admin") {
      return masjid.id === userAssociatedMosqueId;
    }
    return false;
  };

  const canLog = () => userRole !== "system_admin";

  return { canEdit: canEdit(), canLog: canLog() };
}
