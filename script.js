// Request frames function
window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function (callback) {
  window.setTimeout(callback, 1000 / 60)
}
})()

// Create image and set to default if invalid input provided
var image = new Image()
image.src = prompt('Enter an image URL')
image.onerror = function () {
  image.src = './default.svg'
}

// Ensure canvas shape has same dimensions as image
image.onload = function () {
  rect.width = image.width
  rect.height = image.height
}

// Hide and append image
image.style.display = 'none'
document.body.appendChild(image)

// Set favicon
document.getElementById('favicon').setAttribute('href', image.src)

// Draw image on canvas
function showImage (rect, context) {
  context.drawImage(image, rect.x, rect.y)
}

// Movement
var direction = 'se'

function display (rect, canvas, context) {
  var speed = 5

  // If image hits top
  if (rect.y <= 0) {
    if (direction === 'ne') {
      direction = 'se'
    } else if (direction === 'nw') {
      direction = 'sw'
    }

  // If image hits bottom
  } else if (rect.y >= canvas.height - rect.height) {
    if (direction === 'se') {
      direction = 'ne'
    } else if (direction === 'sw') {
      direction = 'nw'
    }

  // If image hits left
  } else if (rect.x <= 0) {
    if (direction === 'nw') {
      direction = 'ne'
    } else if (direction === 'sw') {
      direction = 'se'
    }

  // If image hits right
  } else if (rect.x >= canvas.width - rect.width) {
    if (direction === 'ne') {
      direction = 'nw'
    } else if (direction === 'se') {
      direction = 'sw'
    }
  }

  // Now to define what the directions actually mean
  if (direction === 'ne') {
    rect.x += speed
    rect.y -= speed
  } else if (direction === 'nw') {
    rect.x -= speed
    rect.y -= speed
  } else if (direction === 'se') {
    rect.x += speed
    rect.y += speed
  } else if (direction === 'sw') {
    rect.x -= speed
    rect.y += speed
  }

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  showImage(rect, context)

  // Request another frame
  requestAnimFrame(function () {
    display(rect, canvas, context)
  })
}

// Get canvas and context
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// Change canvas dimensions when browser window is resized
function resize (canvas) {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}
resize(canvas)
window.onresize = function () {
  resize(canvas)
}

// Define canvas rectangle
var rect = {
  x: Math.floor(Math.random() * window.innerWidth) + 1,
  y: Math.floor(Math.random() * window.innerHeight) + 1,
  width: image.width,
  height: image.height
}

// Start animation
showImage(rect, context)
display(rect, canvas, context)
