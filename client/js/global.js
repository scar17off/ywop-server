'use strict';

import { EventEmitter } from 'events';

export const PublicAPI = window.OWOP = window.WorldOfPixels = {};
export const AnnoyingAPI = {
	ws: window.WebSocket
};

export const eventSys = new EventEmitter();