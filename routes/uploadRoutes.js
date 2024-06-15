import multer from "multer";
import path from "path";
import { Router } from "express";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileTypes = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb("images only");
  }
};

const upload = multer({
  storage,
});

const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.file.path);

  return res.status(200).send({
    message: "update product image",
    url: `/${req.file.destination}${req.file.filename}`,
  });
});

export default router;
