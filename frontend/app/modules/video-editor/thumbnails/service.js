module.exports = () => {
  let maxThumbnails = 9,
      thumbnails = undefined;


  let returnValue = max => {
    maxThumbnails = max; // handle under/overflow?

    thumbnails = _.map(_.range(maxThumbnails), index => { return {}; });

    return thumbnails;
  };

  let publish = (() => {
    let canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    return video => {
      let {clientHeight: vh, clientWidth: vw } = video;

      context.height = vh;
      context.width = vw;

      context.drawImage(video, 0, 0, vw, vh);
    };
  })();

  return _.extend(returnValue, {
    publish: publish
  });
};