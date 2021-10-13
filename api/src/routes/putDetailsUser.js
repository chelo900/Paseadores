const { Router } = require("express");
const router = Router();
const { User } = require("../db");

const updateUser = async (req, res) => {
  try {
    const detail = req.body;
    const { id } = req.params;

    await User.update(detail, {
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ message: "Tus datos fueron actualizados correctamente" });
  } catch (error) {
    res.status(401).json({
      error: "No se pudieron realizar los cambios",
    });
  }
};

router.put("/:id", updateUser);

module.exports = router;
