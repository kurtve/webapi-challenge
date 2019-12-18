const express = require('express');
const ProjectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

// all of our /projects endpoints are handled here

// handle get all request
router.get('/', (req, res) => {
  ProjectModel.get()
    .then(projects => {
      if (projects) {
        res.json(projects);
      } else {
        res.status(404).json({ error: 'Error retrieving projects' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving projects' });
    });
});

// handle get by id request
router.get('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  ProjectModel.get(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: `Project ${rawId} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving project' });
    });
});

// handle delete request
router.delete('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  ProjectModel.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ delete_count: deleted });
      } else {
        res.status(404).json({ error: `Project ${rawId} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error deleting project' });
    });
});

// handle post request
router.post('/', (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    res.status(400).json({ error: 'Must include name and description' });
  } else {
    ProjectModel.insert(project)
      .then(newProject => {
        if (newProject) {
          res.status(201).json(newProject);
        } else {
          res.status(500).json({ error: 'Unable to add project to database' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Error adding project' });
      });
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
    ProjectModel.update(id, project)
      .then(newProject => {
        if (newProject) {
          res.status(205).json(newProject);
        } else {
          res.status(500).json({ error: `Unable to update project ${rawId}` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Error updating project' });
      });
  }
});

// get actions for a specified project
router.get('/:id/actions', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  // first check if project is present
  ProjectModel.get(id)
    .then(project => {
      if (project) {
        // now return just the actions for this project
        res.json(project.actions);
      } else {
        res.status(404).json({ error: `Project ${rawId} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving project actions' });
    });
});

module.exports = router;
