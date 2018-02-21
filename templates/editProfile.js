
export const editProfile = () => {
  const editProfilePicButton = document.getElementById("profile-picture");
  const profilePicture = document.getElementsByClassName("avatarPicXL")[0];
  const renderImage = (file) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageUrl = event.target.result;
      profilePicture.setAttribute('src', imageUrl);
    }

    reader.readAsDataURL(file);
  }

  document.getElementById('file').addEventListener('change', function(event) {
     renderImage(this.files[0]);
  }, false);
}
