// Configuration
S.cfga({
    'modalEscapeKey':'esc'
});

// Monitors
var mon_laptop = '1440x900';
var mon_ext = '1920x1080';

// Operations
var focus_macvim = S.op('focus', {'app':'macvim'});
var hide_extras = S.op('hide', {'app':['iTunes', 'Messages', 'Calendar', 'MacVim']});
var show_extras = S.op('show', {'app':['Messages', 'Calendar', 'MacVim']});

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
    'width' :'(screenSizeX/4) * 3',
    'height' :'(screenSizeY/4) * 3'
});
var main_top = main_full.dup({'height':'screenSizeY/2'});
var main_bottom = main_top.dup({'y':'screenOriginY + screenSizeY/2'});
var main_left = main_full.dup({'width':'screenSizeX/2'});
var main_right = main_left.dup({'x':'screenOriginX + screenSizeX/2'});

var lap_full = main_full.dup({'screen':mon_laptop});
var lap_center = main_center.dup({'screen':mon_laptop});
var lap_top = main_top.dup({'screen':mon_laptop});
var lap_bottom = main_bottom.dup({'screen':mon_laptop});
var lap_left = main_left.dup({'screen':mon_laptop});
var lap_right = main_right.dup({'screen':mon_laptop});

var ext_full = main_full.dup({'screen':mon_ext});
var ext_center = main_center.dup({'screen':mon_ext});
var ext_top = main_top.dup({'screen':mon_ext});
var ext_bottom = main_bottom.dup({'screen':mon_ext});
var ext_left = main_left.dup({'screen':mon_ext});
var ext_right = main_right.dup({'screen':mon_ext});

var chatbar = S.op('corner', {
    'screen': mon_laptop,
    'direction': 'top-left'
});
var msgwindow = S.op('move', {
    'screen': mon_laptop,
    'x': 'screenOriginX + screenSizeX/6',
    'y': 'screenOriginY',
    'width': 820,
    'height': 620,
});

var two_monitor_layout = S.lay('twoMonitor', {
    '_before_':{'operations':[show_extras]},
    '_after_':{'operations':[focus_macvim]},
    'Firefox':{
        'operations':[ext_full]
    },
    'Google Chrome':{
        'operations':[ext_full]
    },
    'iTerm':{
        'operations':[ext_full]
    },
    'Skype':{
        'operations':[lap_full]
    },
    'Messages':{
        'operations':[chatbar, msgwindow],
        'title-order':["Buddies"]
    },
    'MacVim':{
        'operations':[ext_left, ext_right],
        'repeat':true
    },
    'iTunes':{
        'operations':[lap_full]
    }
});

var one_monitor_layout = S.lay('oneMonitor', {
    '_after_':{'operations':[hide_extras]},
    'Firefox':{
        'operations':[lap_full]
    },
    'Google Chrome':{
        'operations':[lap_full]
    },
    'iTerm':{
        'operations':[lap_full]
    },
    'MacVim':{
        'operations':[lap_full],
        'repeat':true
    }
});

// Bind default layouts
S.def([mon_laptop, mon_ext], two_monitor_layout);
S.def([mon_laptop], one_monitor_layout);
var two_monitor = S.op('layout', {'name':two_monitor_layout});
var one_monitor = S.op('layout', {'name':one_monitor_layout});
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
