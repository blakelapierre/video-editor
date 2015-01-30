var angular = require('angular'),
    sanitize = require('angular-sanitize');

module.exports = {
  'content-editable': angular.module('content-editable', ['ngSanitize'])
    .directive('contenteditable', require('./modules/content-editable/contentEditable/directive.js'))
  ,
  'drag-and-drop': angular.module('drag-and-drop', [])
    .directive('fileDropArea', require('./modules/drag-and-drop/fileDropArea/directive'))
  ,
  'event-listeners': angular.module('event-listeners', [])
    .factory('on',  require('./modules/event-listeners/on/factory'))
    .factory('off', require('./modules/event-listeners/off/factory'))
  ,
  'inputs': angular.module('inputs', [])
    .directive('number', require('./modules/inputs/number/directive'))
  ,
  'video-editor': angular.module('video-editor', ['content-editable', 'drag-and-drop', 'event-listeners', 'inputs'])
    .directive('audioPanel',      require('./modules/video-editor/audioPanel/directive'))
    .directive('editor',          require('./modules/video-editor/editor/directive'))
    .directive('filtersPanel',    require('./modules/video-editor/filtersPanel/directive'))
    .directive('playbackSurface', require('./modules/video-editor/playbackSurface/directive'))
    .directive('positionBar',     require('./modules/video-editor/positionBar/directive'))
    .directive('timeline',        require('./modules/video-editor/timeline/directive'))

    .service('thumbnails', require('./modules/video-editor/thumbnails/service'))
};