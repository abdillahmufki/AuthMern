import Product from "../models/ProductModel.js";
import User from "../models/UsersModel.js";
import { Op } from "sequelize";
import path from "path";
import multer from "multer";

// The rest of your code remains unchanged.

export const getUserProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["uuid", "name", "description", "image"],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role == "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "description", "image"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "description", "image"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    let response;
    if (req.role == "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "description", "image"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "description", "image"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Define the absolute path to the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const createProduct = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const image = req.file.path;

    const product = await Product.create({
      name: name,
      description: description,
      userId: req.userId,
      image: image,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only images (JPEG, JPG, PNG, GIF) are allowed!");
    }
  },
}).single("image");

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description } = req.body;

    if (req.role === "admin") {
      await Product.update(
        {
          name: name,
          description: description,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId) {
        return res
          .status(403)
          .json({ message: "You're not allowed to update this product" });
      }

      await Product.update(
        { name, description },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }

    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId) {
        return res
          .status(403)
          .json({ message: "You're not allowed to delete this product" });
      }

      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
