const { Router } = require("express");
const { googleVerify } = require("../utils/utils");

const router = Router();

router.post("/", async (req, res) => {
  const { tokenId } = req.body;

  try{
    
    const googleUser = await googleVerify( tokenId )

      res.json({
          msg:'Todo bien',
          tokenId
      })
      
  } catch (error){
    console.warn
  }

})

module.exports = router;