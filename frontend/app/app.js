var angular = require('angular'),
    sanitize = require('angular-sanitize');

module.exports = {
  'content-editable': angular.module('content-editable', ['ngSanitize'])
    .directive('contenteditable', require('./modules/content-editable/contentEditable/directive.js'))
  ,
  'drag-and-drop': angular.module('drag-and-drop', [])
    .directive('fileDropArea', require('./modules/drag-and-drop/fileDropArea/directive'))
  ,
  'inputs': angular.module('inputs', [])
    .directive('number', require('./modules/inputs/number/directive'))
  ,
  'video-editor': angular.module('video-editor', ['drag-and-drop', 'content-editable', 'inputs'])
    .directive('editor',          require('./modules/video-editor/editor/directive'))
    .directive('filtersPanel',    require('./modules/video-editor/filtersPanel/directive'))
    .directive('playbackSurface', require('./modules/video-editor/playbackSurface/directive'))
    .directive('positionBar',     require('./modules/video-editor/positionBar/directive'))
    .directive('timeline',        require('./modules/video-editor/timeline/directive'))

    .service('thumbnails', require('./modules/video-editor/thumbnails/service'))
};