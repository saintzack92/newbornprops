import multer from 'multer';
import { query } from "@/app/lib/utils";
import { createRouter } from 'next-connect';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Make sure this folder exists
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  }),
});

// Initialize the router
const router = createRouter();

router.post(upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const file = req.file; // Multer adds the file info here
    const insertResult = await query({
      query: `INSERT INTO images (name, hash, extension, mime, path, size, url, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        file.filename,
        'hash_placeholder', // Generate or store a hash if necessary
        file.mimetype.split('/')[1],
        file.mimetype,
        file.path,
        file.size,
        `/uploads/${file.filename}`, // Assuming you serve files from public/uploads
        'user_id_placeholder' // Replace with actual user ID or createdBy info
      ],
    });

    res.status(200).json({ success: true, message: "File uploaded successfully", file: `/uploads/${file.filename}`, id: insertResult.insertId });
  } catch (error) {
    console.error('Error saving file information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get(async (req, res) => {
  try {
    const imagesData = await query({
      query: `SELECT * FROM images`, // Modify the query as needed to fit your schema
    });

    if (!imagesData.length) {
      return res.status(404).json({ error: 'No images found.' });
    }

    res.status(200).json({ success: true, images: imagesData });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router as the default export
export default router.handler(); // Notice the .handler() call  

export const config = {
  api: {
    bodyParser: false, 
  },
};
