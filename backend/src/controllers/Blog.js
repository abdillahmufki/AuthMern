import Blogs from "../models/BlogModel.js";

export const getBlogs = async (req, res) => {
  try {
    const response = await Blogs.findAll({
      attributes: ["uuid", "title", "content"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const response = await Blogs.findOne({
      attributes: ["uuid", "title", "content"],
      where: { uuid: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    await Blogs.create({
      title: title,
      content: content,
    });
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const blog = await Blogs.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!blog) return res.status(404).json({ message: "Blog not found update" });
  const { title, content } = req.body;

  try {
    await Blogs.update(
      {
        title: title,
        content: content,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blogs.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
