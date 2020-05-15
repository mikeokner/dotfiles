// Configuration
S.cfga({
    'modalEscapeKey': 'esc'
});

// Monitors
var mon_laptop = '1792x1120';  // 16" MacBook Pro
var mon_ext = '3840x2160';  // 4k external

// Operations
var focus_iterm = S.op('focus', {'app': 'iTerm'});
var focus_slack = S.op('focus', {'app': 'Slack'});
var focus_firefox = S.op('focus', {'app': 'Firefox'});
var hide_extras = S.op('hide', {'app': [
    'Google Chrome',
    'Microsoft Outlook',
    'Microsoft Teams'
]});
var show_extras = S.op('show', {'app': [
    'Google Chrome',
    'Microsoft Outlook',
    'Microsoft Teams'
]});

// Moves
var main_full = S.op('move', {
    'x': 'screenOriginX',
    'y': 'screenOriginY',
    'width': 'screenSizeX',
    'height': 'screenSizeY'
});
var main_center = S.op('move', {
    'x': 'screenOriginX + screenSizeX/8',
    'y': 'screenOriginY + screenSizeY/8',
    'width': '(screenSizeX/4) * 3',
    'height': '(screenSizeY/4) * 3'
});
var main_top = main_full.dup({'height': 'screenSizeY/2'});
var main_bottom = main_top.dup({'y': 'screenOriginY + screenSizeY/2'});
var main_left = main_full.dup({'width': 'screenSizeX/2'});
var main_right = main_left.dup({'x': 'screenOriginX + screenSizeX/2'});

var lap_full = main_full.dup({'screen': mon_laptop});
var lap_center = main_center.dup({'screen': mon_laptop});
var lap_top = main_top.dup({'screen': mon_laptop});
var lap_bottom = main_bottom.dup({'screen': mon_laptop});
var lap_left = main_left.dup({'screen': mon_laptop});
var lap_right = main_right.dup({'screen': mon_laptop});

var ext_full = main_full.dup({'screen': mon_ext});
var ext_center = main_center.dup({'screen': mon_ext});
var ext_top = main_top.dup({'screen': mon_ext});
var ext_bottom = main_bottom.dup({'screen': mon_ext});
var ext_left = main_left.dup({'screen': mon_ext});
var ext_right = main_right.dup({'screen': mon_ext});

var two_monitor_layout = S.lay('twoMonitor', {
    '_before_': {'operations': [show_extras]},
    '_after_': {'operations': [focus_slack]},
    'Firefox': {
        'operations': [ext_left],
        'repeat': true
    },
    'Google Chrome': {
        'operations': [ext_left],
        'repeat': true
    },
    'iTerm': {
        'operations': [ext_right]
    },
    'MacVim': {
        'operations': [ext_left],
        'repeat': true
    },
    'Slack': {
        'operations': [lap_full]
    },
    'Microsoft Outlook': {
        'operations': [lap_full]
    },
    'Microsoft Teams': {
        'operations': [lap_full]
    }
});

var one_monitor_layout = S.lay('oneMonitor', {
    '_after_': {'operations': [hide_extras, focus_firefox]},
    'Firefox': {
        'operations': [lap_full],
        'repeat': true
    },
    'Google Chrome': {
        'operations': [lap_full],
        'repeat': true
    },
    'iTerm': {
        'operations': [lap_full]
    },
    'MacVim': {
        'operations': [lap_full],
        'repeat': true
    },
    'Slack': {
        'operations': [lap_full]
    },
    'Microsoft Outlook': {
        'operations': [lap_full]
    },
    'Microsoft Teams': {
        'operations': [lap_full]
    },
    'Microsoft OneNote': {
        'operations': [lap_full]
    }
});

// Bind default layouts
S.def([mon_laptop, mon_ext], two_monitor_layout);
S.def([mon_laptop], one_monitor_layout);
var two_monitor = S.op('layout', {'name': two_monitor_layout});
var one_monitor = S.op('layout', {'name': one_monitor_layout});
function universal_layout() {
    if (S.screenCount() === 2) {
        two_monitor.run();
    }
    else if (S.screenCount() === 1) {
        one_monitor.run();
    }
}

// Batch bind keys
S.bnda({
    'f:cmd,j': main_full,
    'h:cmd,j': main_left,
    'j:cmd,j': main_bottom,
    'k:cmd,j': main_top,
    'l:cmd,j': main_right,
    'c:cmd,j': main_center,
    'b:cmd,j': lap_full,
    'a:cmd,j': ext_full
});

S.log("---------- .SLATE.JS LOADED ----------");
