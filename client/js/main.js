window.onload = getExistingLocations;

var locationReference = {};

async function getExistingLocations() {
  await axios
    .get("http://localhost:3000/locations")
    .then((res) => {
      var topNav = document.getElementById("topnav");
      var locationInfo = document.createElement("div");
      locationInfo.classList.add("info_text");
      locations = res.data;
      res.data.forEach((location) => {
        var a = document.createElement("a");
        a.onclick = renderLocation;
        a.innerHTML = location.name;
        locationReference[location.name] = location._id;
        topNav.appendChild(a);
      });
    })
    .catch((err) => console.log(err));
}

async function renderLocation(e) {
  let name = e.srcElement.innerHTML;
  try {
    let activeElement = document.querySelector(".active");
    activeElement.classList.remove("active");
  } catch (error) {
    console.log(error.message);
  }

  document.querySelectorAll("#topnav a").forEach((link) => {
    if (link.innerText == name) {
      link.classList.add("active");
    }
  });
  document.getElementById("addlocation").style.display = "none";
  document.getElementById("container").style.display = "block";
  document.getElementById("removelocation").style.display = "none";
  let location = await getLocationById(locationReference[name]);
  let resultDiv = document.createElement("div");
  let countryH2 = document.createElement("h2");
  countryH2.innerHTML = location.country;
  resultDiv.append(countryH2);
  for (var i = 0; i < location.text.length; i++) {
    let p = document.createElement("p");
    let text = document.createTextNode(location.text[i]);
    p.appendChild(text);
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(p);
    if (location.imageURL[2 * i] != null) {
      let imgContainer = document.createElement("div");
      imgContainer.classList.add(".img_container");
      let img1 = document.createElement("img");
      img1.src = location.imageURL[2 * i];
      img1.classList.add("floatRight");
      let img2 = document.createElement("img");
      img2.src = location.imageURL[2 * i + 1];
      img2.classList.add("floatRight");
      imgContainer.append(img1, img2);
      resultDiv.appendChild(imgContainer);
    }
  }
  document.getElementById("container").innerHTML = resultDiv.innerHTML;
}

async function getLocationById(id) {
  return axios
    .get("http://localhost:3000/locations/" + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
async function SubmitAndGetLocationId() {
  let mainForm = document.getElementById("main-form");

  let formObj = {};
  for (let [key, val] of new FormData(mainForm)) {
    formObj[key] = val;
  }
  return axios
    .post("http://localhost:3000/locations", JSON.stringify(formObj), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data._id)
    .catch((err) => console.log(err));
}
async function SubmitImgAndGetURL() {
  let subForm = document.getElementById("sub-form");
  return axios
    .post("http://localhost:3000/upload", new FormData(subForm), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
async function submitForms() {
  let newLocationId = await SubmitAndGetLocationId();
  let imageURL = await SubmitImgAndGetURL();

  patchImageUrl(newLocationId, imageURL);
}
async function patchImageUrl(locationId, imageURL) {
  await axios
    .patch("http://localhost:3000/locations/" + locationId, {
      imageURL: imageURL,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
function showForm() {
  document.getElementById("addlocation").style.display = "block";
  document.getElementById("container").style.display = "none";
  document.getElementById("removelocation").style.display = "none";
}

//show the delete box
function deletebox() {
  document.getElementById("addlocation").style.display = "none";
  document.getElementById("removelocation").style.display = "block";
  document.getElementById("container").style.display = "none";

  let selectMenu = document.getElementById("location-select");
  for (var key in locationReference) {
    let opt = document.createElement("option");
    opt.value = key;
    opt.innerHTML = key;
    selectMenu.appendChild(opt);
  }
}

function removeLocation() {
  let locationToDelete = document.getElementById("location-select").value;
  axios
    .delete(
      "http://localhost:3000/locations/" + locationReference[locationToDelete]
    )
    .then((res) => {
      alert(res.data.message);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

function removeAllLocations() {
  if (confirm("Are you sure?")) {
    axios
      .delete("http://localhost:3000/locations")
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
