## Ingame API
### There is an Ingame-API in YWOP. You can fetch player info and get pixel logs using your modlogin or adminlogin inside/outside your browser.
## Fetch player info
#### Output
```json
{
    "x_pos": 688,
    "y_pos": 14,
    "col_r": 57,
    "col_g": 205,
    "col_b": 121,
    "tool": 1,
    "warnlvl": 0,
    "id": 1,
    "nick": "scar17off",
    "rank": 3,
    "ip": "XXX.XXX.XXX.XXX",
    "world": "main"
}
```
## Examples
#### Inside a browser
```javascript
const url = location.origin + '/api/playerinfo/';
const headers = {
    'x-player-id': 'PlayerID here',
    'x-password': 'Adminlogin or Modlogin'
};

const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.setRequestHeader('x-player-id', headers['x-player-id']);
xhr.setRequestHeader('x-password', headers['x-password']);

xhr.onload = function() {
    if(xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
    } else {
        console.error('Request failed with status: ' + xhr.status);
    };
};

xhr.onerror = function() {
    console.error('Request failed');
};

xhr.send();
```
#### Outside a browser (node.js)
```javascript
const axios = require('axios');

const url = `${location.origin}/api/playerinfo/`;
const headers = {
    'x-player-id': 'PlayerID here',
    'x-password': 'Adminlogin or Modlogin'
};

axios.get(url, {
        headers
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        if(error.response) {
            console.error('Request failed with status:', error.response.status);
        } else {
            console.error('Request failed:', error.message);
        };
    });
```
## Fetch pixel logs
#### Output
```json
{}
```
#### Inside a browser
```javascript
```
#### Outside a browser (node.js)
```javascript
```