import Project from '../models/Project.js';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const projects = await Project.find(filter).sort({
      featured: -1,
      order: 1,
      createdAt: -1
    });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug.toLowerCase() });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${req.params.slug}' not found`,
        data: null
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body };
    if (!projectData.slug && projectData.title) {
      projectData.slug = slugify(projectData.title);
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (!updateData.slug && updateData.title) {
      updateData.slug = slugify(updateData.title);
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
