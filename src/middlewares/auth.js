import { verify } from "../helpers/jwt";
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader)
      return res
        .status(401)
        .json({ status: "error", error: "Not Authenticated!" });
    const token = authHeader.split(" ")[1];
    const verified = verify(token);
    req.user = verified;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", error: "Not Authenticated!" });
  }
};

export const verifyTokenAndRole = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.includes("admin")) {
      next();
    } else {
      return res
        .status(401)
        .json({ status: "error", error: "Not Authenticated!" });
    }
  });
};
