'use strict';

import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.events({
  'click .toggle-checked': function() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked }
    });
  },
  'click .delete': function() {
    Tasks.remove(this._id);
  },
});