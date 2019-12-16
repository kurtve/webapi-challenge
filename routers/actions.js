const express = require('express');
const ActionModel = require('../data/helpers/actionModel.js');

const router = express.Router();

// all of our /actions endpoints are handled here

// handle get all request
router.get('/', (req, res) => {
  ActionModel.get()
    .then(actions => {
      if (actions) {
        res.json(actions);
      } else {
        res.status(404).json({ error: 'Error retrieving actions' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving actions' });
    });
});

// handle get by id request
router.get('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  ActionModel.get(id)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ error: `action ${rawId} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving action' });
    });
});

// handle delete request
router.delete('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  ActionModel.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ delete_count: deleted });
      } else {
        res.status(404).json({ error: `action ${rawId} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error deleting action' });
    });
});

// handle post request
router.post('/', (req, res) => {
  const action = req.body;
  if (!action.notes || !action.description || !action.project_id) {
    res
      .status(400)
      .json({ error: 'Must include description, notes, and project_id' });
  } else {
    ActionModel.insert(action)
      .then(newaction => {
        if (newaction) {
          res.status(201).json(newaction);
        } else {
          res.status(500).json({ error: 'Unable to add action to database' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Error adding action' });
      });
  }
});

// handle update request
router.put('/:id', (req, res) => {
  const rawId = req.params.id;
  const id = Number.parseInt(rawId);
  const action = req.body;
  if (!action.notes || !action.description || !action.project_id) {
    res
      .status(400)
      .json({ error: 'Must include description, notes, and project_id' });
  } else {
    ActionModel.update(id, action)
      .then(newaction => {
        if (newaction) {
          res.status(205).json(newaction);
        } else {
          res.status(500).json({ error: `Unable to update action ${rawId}` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Error updating action' });
      });
  }
});

module.exports = router;
