export const editProfilePicture = () => {
  const editProfilePicButton = document.getElementById("profile-picture");
  const profilePicture = document.getElementsByClassName("avatarPicXL")[0];
  const fileInput = document.getElementById('file');
  const sidebarImage = document.getElementsByClassName('sidebarImage')[0];

  const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  };

  const drop = (event) => {
    var fileList = event.dataTransfer.files;
    renderImage(fileList[0]);
  };

  const renderImage = (file) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageUrl = event.target.result;
      sidebarImage.setAttribute('src', imageUrl)
      profilePicture.setAttribute('src', imageUrl);
    }

    reader.readAsDataURL(file);
  };

  // TODO: Set up backend service for setting profile picture
  const uploadFile = (file) => {
    const url = 'where we are sending the picture';
    let formData = new FormData();
    let headers = new Headers({
	        "Content-Type": "multipart/form-data",
	        "X-File-Name": file.name,
          "X-File-Size": file.size,
          "X-File-Type": file.type
        });

    formData.append('file', file);

    fetch(url, {
      method: 'POST',
      body: formData,
      headers: headers
    })
    .then(() => { console.log("success!"); })
    .catch(() => { console.error("Could not upload file..."); });
  };

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    editProfilePicButton.addEventListener(eventName, preventDefaults, false)
  });

  editProfilePicButton.addEventListener("drop", drop, false);
  fileInput.addEventListener('change', function(event) {
     renderImage(this.files[0]);
     uploadFile(this.files[0]);
  }, false);
}
