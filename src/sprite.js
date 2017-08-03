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

'use strict';

import _ from 'lodash/fp';

const DEFAULT_STATE = {
  tileset: {
    id: 'blank',
    src: '/assets/sprite/ryan.gif',
    height: 30,
    width: 30,
    x: 0,
    y: 0
  },
  height: 60,
  width: 60,
  x: 0,
  y: 0
};

/**
 * Create a sprite.
 *
 * @param {Object} loadState
 * @param {Object} extendedDefaultState
 * @returns {Object}
 */
export default function Sprite(loadState, extendedDefaultState) {
  const _defaultState = _.defaults(_.cloneDeep(DEFAULT_STATE), _.cloneDeep(extendedDefaultState));
  const _state = _.defaults(_defaultState, loadState);

  /**
   * Trigger an update.
   *
   * @param {Number} fps
   * @param {Object} gameLoop
   */
  _state.update = (fps, gameLoop) => {
    // do nothing.
  };

  return _state;
}
