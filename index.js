document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("videoElement");
  var constraintsEl = document.getElementById("constraints");
  var appliedConstraintsEl = document.getElementById("applied-constraints");
  var canvas = document.getElementById("canvasElement");
  var img = document.getElementById("capturedImage");
  var captureButton = document.getElementById("captureButton");

  if (navigator.mediaDevices.getUserMedia) {
    let constraints;
    if (window.getCameraConstraints) {
      constraints = getCameraConstraints();
    } else {
      constraints = { video: true };
    }
    constraintsEl.innerHTML = JSON.stringify(constraints, null, 2);
    console.log(">>> Using Constraints:", constraints);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        video.srcObject = stream;

        appliedConstraintsEl.innerHTML = JSON.stringify(
          stream.getVideoTracks()[0].getConstraints(),
          null,
          2
        );
      })
      .catch(function (error) {
        console.error("Error while starting camera stream", error);
      });
  } else {
    console.log("getUserMedia not supported");
  }

  captureButton.addEventListener("click", function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    img.src = canvas.toDataURL("image/png");
  });
});
