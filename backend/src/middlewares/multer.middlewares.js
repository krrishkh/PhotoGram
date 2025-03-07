import multer from "multer";
import path from "path";

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
