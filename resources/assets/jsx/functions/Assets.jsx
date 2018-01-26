
/*
  Anything to do with asset management
*/

let Strings = require('functions/Strings.jsx')

export function staticImage(path) {
  let basePath = '/images/'
  return `${basePath}${path}`
}

export function media(path) {
  let basePath = '/uploads/'
  return `${basePath}${path}`
}

export function media100x100(path) {
  let basePath = '/uploads/100x100/'
  return `${basePath}${path}`
}

export function generateThumbnail(media, imgClass = 'img-thumbnail', withFilename = false) {
  let image = null

  if (media.mime === 'image/jpeg' || media.mime === 'image/png') {
    image = (
      <img
        className={imgClass}
        src={this.media100x100(media.filename)}
      />
    )
  } else if (media.mime === 'application/pdf') {
    image = (
      <img
        className={imgClass}
        src={this.media100x100(Strings.getFileName(media.filename) + '.png')}
      />
    )
  } else {
    image = (
      <img
        className={imgClass}
        src={this.staticImage('file-icon.png')}
      />
    )
  }
  return (
    <a
      href={this.media(media.filename)}
      target="_blank"
    >
      {image}
      {withFilename ? (
        <span>
          <br />
          <strong>
            {media.filename}
          </strong>
        </span>
      ) : null}
    </a>
  )
}
