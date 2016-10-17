'use strict'

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', function () {
    describe('methods', function () {
      const userId = Random.id();
      let taskId;

      beforeEach(function () {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'Test Test Test',
          createdAt: new Date(),
          owner: userId,
          username: 'foo-bar'
        });
      });

      it('can delete owned task', function () {
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        const invocation = { userId };
        deleteTask.apply(invocation, [taskId]);
        assert.equal(Tasks.find().count(), 0);
      });
    });
  });
}