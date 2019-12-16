const express = require('express');
const pModel = require('../data/helpers/projectModel.js');

const router = express.Router();

// all of our /projects endpoints are handled here

// handle get all request
router.get('/', (req, res) => {
  res.json(pModel.get());
});

// handle get by id request
router.get('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  const project = pModel.get(id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: `Project ${rawId} not found` });
  }
});

// handle delete request
router.delete('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  const deleted = pModel.remove(id);
  if (deleted) {
    res.status(202).json({ delete_count: deleted });
  } else {
    res.status(404).json({ error: `Project ${rawId} not found` });
  }
});

// handle post request
router.post('/', (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    res.status(400).json({ error: 'Must include name and description' });
  } else {
    const newProject = pModel.insert(project);
    if (newProject) {
      res.status(201).json(newProject);
    } else {
      res.status(500).json({ error: 'Unable to add project to database' });
    }
  }
});

// handle update request
router.put('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  const project = req.body;
  if (!project.name || !project.description) {
    res.status(400).json({ error: 'Must include name and description' });
  } else {
    const newProject = pModel.update(id, project);
    if (newProject) {
      res.status(205).json(newProject);
    } else {
      res.status(500).json({ error: `Unable to update project ${rawId}` });
    }
  }
});

module.exports = router;
