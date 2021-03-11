'use strict';

window.addEventListener('DOMContentLoaded',() => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        slider = require('./modules/slider'),
        forms = require('./modules/forms'),
        carts = require('./modules/carts'),
        calc = require('./modules/calc');
        tabs();
        modal();
        timer();
        slider();
        forms();
        carts();
        calc();
});
