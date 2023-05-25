import { Router } from "express";
import { User } from "./user.models";
import { IUser } from "./users.interface";
import { findOne, createUser } from "./users.repository";
const router: Router = Router();

router.post("/", async (req, res) => {
  const { first_name, last_name, email, gender, password } = req.body;

  try {
    let user = await findOne(email);

    if (user) {
      res.status(403).json({
        message: "User Already Exists",
      });
    }

    const userFields: IUser = {
      first_name,
      last_name,
      email,
      password,
      gender,
    };

    user = await createUser(userFields);

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        user,
      });
    }
  } catch (error) {}
});

export default router;
