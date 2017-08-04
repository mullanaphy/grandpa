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

/* @TODO This is just for testing */

import DIRECTION from './movement/direction';
import SIZER from './sizer';
import MathUtility from './utility/math';
import movementFactory from './movement';

/**
 * Create a sprite.
 *
 * @param {Object?} loadState
 * @returns {Object}
 */
export default function Sprite(loadState) {
  return Object.assign(Object.create({
    equipment: {
      leftHand: null,
      rightHand: null,
      head: null,
      boots: null,
      accessories: []
    },
    tileset: {
      id: 'blank',
      src: '/assets/sprite/ryan.gif',
      x: 0,
      y: 0
    },
    speed: {
      x: 5,
      y: 5
    },
    x: 0,
    y: 0,
    height: 30,
    width: 30,
    movement: movementFactory(),

    /**
     * Render an update.
     */
    update() {

    },

    /**
     * Detect if we have any movement and change state accordingly.
     */
    detectMovement() {
      const movement = this.movement;

      if (movement.stunned) {
        return;
      }

      const maxX = SIZER.width - SIZER.relativeSize(this.width);
      const maxY = SIZER.height - SIZER.relativeSize(this.height);

      let x = this.x;
      let y = this.y;

      let speedX = this.speed.x;
      let speedY = this.speed.y;
      if (movement.running) {
        speedX = Math.round(speedX * 1.75);
        speedY = Math.round(speedY * 1.75);
      }

      switch (movement.moving) {
        case DIRECTION.UP_RIGHT:
          x = x + SIZER.relativeSize(speedX);
          y = y - SIZER.relativeSize(speedY);
          break;
        case DIRECTION.UP_LEFT:
          x = x - SIZER.relativeSize(speedX);
          y = y - SIZER.relativeSize(speedY);
          break;
        case DIRECTION.DOWN_RIGHT:
          x = x + SIZER.relativeSize(speedX);
          y = y + SIZER.relativeSize(speedY);
          break;
        case DIRECTION.DOWN_LEFT:
          x = x - SIZER.relativeSize(speedX);
          y = y + SIZER.relativeSize(speedY);
          break;
        case DIRECTION.RIGHT:
          x = x + SIZER.relativeSize(speedX);
          break;
        case DIRECTION.LEFT:
          x = x - SIZER.relativeSize(speedX);
          break;
        case DIRECTION.UP:
          y = y - SIZER.relativeSize(speedY);
          break;
        case DIRECTION.DOWN:
          y = y + SIZER.relativeSize(speedY);
          break;
      }

      this.x = MathUtility.minMax(x, 0, maxX);
      this.y = MathUtility.minMax(y, 0, maxY);
    }
  }, loadState || {}));
}
