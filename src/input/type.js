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

/**
 * ENUM covering input connects this game supports.
 *
 * **Input.TYPE:**
 * ```
 * KEYBOARD
 * TOUCH
 * ```
 *
 * @module input/type
 */

'use strict';

const INPUT_TYPE = {
  KEYBOARD: 'KEYBOARD',
  TOUCH: 'TOUCH'
};
Object.freeze(INPUT_TYPE);

export default INPUT_TYPE;
