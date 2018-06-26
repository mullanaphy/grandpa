/**
 * NUMBER ONE GRANDPA
 *
 * LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@puresalt.gg so we can send you a copy immediately.
 *
 */

/* globals document */

'use strict';

import _ from 'lodash/fp';
import EVENT from '../event';
import KEY from './key';
import {reverseLookup} from './key/lookup';

const _defaultConfig = {
  element: document.body,
  keys: [
    {input: KEY.LEFT, keyCode: reverseLookup('A')},
    {input: KEY.RIGHT, keyCode: reverseLookup('D')},
    {input: KEY.UP, keyCode: reverseLookup('W')},
    {input: KEY.DOWN, keyCode: reverseLookup('S')},
    {input: KEY.PUNCH, keyCode: reverseLookup('J')},
    {input: KEY.KICK, keyCode: reverseLookup('K')},
    {input: KEY.JUMP, keyCode: reverseLookup('SPACE')},
    {input: KEY.CROUCH, keyCode: reverseLookup('SHIFT_LEFT')},
    {input: KEY.MENU, keyCode: reverseLookup('ESC')},
    {input: KEY.DEBUG, keyCode: reverseLookup('F1')}
  ]
};
Object.freeze(_defaultConfig);

/**
 * Function to first map a configuration to our Input.KEY enum, and then to map that to an event lookup and attach it to
 * our element's event listener.
 *
 * @param {Object} config
 * @param {Object} inputState
 * @param {StateMachine?} context
 * @returns {{getConfig: function(), remove: function()}}
 */
export default function KeyboardInput(config, inputState, context) {
  const _extendedConfig = _.defaults(_defaultConfig, config || {});
  _extendedConfig.type = 'keyboard';
  const _eventLookup = _generateEventLookup(_extendedConfig.keys);

  /**
   * Helper function to add our event listener on both up and down.
   *
   * @param {String} direction
   * @returns {function(event: KeyboardEvent)}
   * @private
   */
  const _eventListener = (direction) => {
    return (event) => {
      const found = _eventLookup[event.keyCode + '-' + event.location];
      if (!found || !inputState.triggerEvent(direction, found, context)) {
        return;
      }
      event.preventDefault();
      event.cancelBubble = true;
      event.returnValue = false;
      return false;
    };
  };

  const _press = _eventListener(EVENT.PRESS);
  const _release = _eventListener(EVENT.RELEASE);

  const methods = {
    /**
     * Add our event listeners onto our element in the case someone switches back to keyboard.
     */
    add() {
      _extendedConfig.element.addEventListener('keydown', _press);
      _extendedConfig.element.addEventListener('keyup', _release);
    },

    /**
     * Get the current config.
     *
     * @returns {*}
     */
    getConfig() {
      return _extendedConfig;
    },

    /**
     * Remove our event listeners in the case that we're going to switch input.
     */
    remove() {
      _extendedConfig.element.removeEventListener('keydown', _press);
      _extendedConfig.element.removeEventListener('keyup', _release);
    }
  };
  Object.freeze(methods);
  methods.add();

  return methods;
}

/**
 * Generate an event lookup.
 *
 * @param {Array} events
 * @returns {Object}
 */
function _generateEventLookup(events) {
  return events.reduce((gathered, item) => {
    gathered[item.keyCode] = item.input;
    return gathered;
  }, {});
}
