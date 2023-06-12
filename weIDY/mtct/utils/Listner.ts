// listener.js
import { EventEmitter } from 'events';
import {
  connectionListner,
  connectionListnerSignUp,
} from '../integration/integration';
import { OutOfBandRecord } from '@aries-framework/core';

class Listener extends EventEmitter {
  constructor() {
    super();
  }

  createConnectionListnerSignUp(outOfBandRecord: OutOfBandRecord, email: any) {
    connectionListnerSignUp(outOfBandRecord, email);
  }

  stop() {
    // Clean up resources, remove event listeners, etc.
    this.removeAllListeners();
  }
}

export default Listener;
