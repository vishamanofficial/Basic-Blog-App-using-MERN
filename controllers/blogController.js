const mongoose = require('mongoose');
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
// GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs List",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error,
    });
  }
};

// CREATE BLOG
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    // validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const exisitingUser = await userModel.findById(user.id);

    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });

    const session = await mongoose.startSession()
    session.startTransaction();
    await newBlog.save({sessoion})
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({session});
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Creating Blog",
      error,
    });
  }
};

// UPDATE BLOG
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;

    await blog.save();

    return res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Updating Blog",
      error,
    });
  }
};

// GET SINGLE BLOG
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Found",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blog",
      error,
    });
  }
};

// DELETE BLOG
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting Blog",
      error,
    });
  }
};
