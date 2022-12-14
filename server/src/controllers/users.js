import User from "../models/User.js";

export async function getUserController(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
}
