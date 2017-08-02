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

import StateMachine from './vendor/stateMachine';
import input from './input';
import KEY from './input/key';

(function app() {

  const config = {
    input: {
      type: 'keyboard'
    }
  };

  const stateMachine = StateMachine.factory({
    init: 'loading',
    events: [
      {name: 'ready', from: 'loading', to: 'menu'}, // initial page loads images and sounds then transitions to 'menu'
      {name: 'start', from: 'menu', to: 'starting'}, // start a new game from the menu
      {name: 'load', from: ['starting', 'playing'], to: 'loading'}, // start loading a new leve
      {name: 'play', from: 'loading', to: 'playing'}, // play the level after loading it
      {name: 'help', from: ['loading', 'playing'], to: 'help'}, // pause the game to show a help topic
      {name: 'resume', from: 'help', to: 'playing'}, // resume playing after showing a help topic
      {name: 'lose', from: 'playing', to: 'lost'}, // player died
      {name: 'quit', from: 'playing', to: 'lost'}, // player quit
      {name: 'win', from: 'playing', to: 'won'}, // player won
      {name: 'finish', from: ['won', 'lost'], to: 'menu'}  // back to menu
    ]
  });

  input(config.input, [
    {
      input: KEY.LEFT,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.RIGHT,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.UP,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.DOWN,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.PUNCH,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.KICK,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.JUMP,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.CROUCH,
      state: 'playing',
      callback: () => {
      }
    },
    {
      input: KEY.MENU,
      state: 'playing',
      callback: () => {
      }
    }
  ], stateMachine);

})();
