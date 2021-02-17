import User from "../models/User";
import Role from "../models/Role";
import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    console.log(count)
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    console.log(values);

  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  try {
    const users = await User.find({ email: "admin@localhost" });
    const user = users[0];
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
      await User.create({
        username: "admin",
        email: "admin@localhost",
        password: await bcrypt.hash("admin", 10),
        roles: roles.map((role) => role._id),
      });
      console.log("Admin User Created!");
    }
  } catch (error) {
    console.log("Ocurrio un error", error);
  }
};
