export default function authorizeRole(allowedRoles = []) {
  return (req, res, next) => {
    const roleId = req.user?.roleId;

    if (!roleId) {
      return res.status(403).json({
        success: false,
        error: "Rol no encontrado en el token",
      });
    }

    if (!allowedRoles.includes(roleId)) {
      return res.status(403).json({
        success: false,
        error: "No tienes permisos para acceder a este recurso",
      });
    }

    next();
  };
}
