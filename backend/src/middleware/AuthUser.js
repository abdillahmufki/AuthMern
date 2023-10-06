import User from "../models/UsersModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Please log in to your account!" });

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ message: "User not found middleware auth" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ message: "User not found middleware auth" });

  if (user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });
  next();
};
