import express from "express";

import {
  getBlogs,
  createBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
} from "../controllers/Blog.js";

const router = express.Router();

router.get("blog/", getBlogs);
router.get("blog/:id", getBlogById);
router.post("blog/", createBlog);
router.put("blog/:id", updateBlog);
router.delete("blog/:id", deleteBlog);

export default router;
