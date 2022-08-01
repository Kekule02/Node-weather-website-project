console.log("client side javascript file is loaded");
//////////////
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From Javascript";

///////////////////
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

  // Removing the previous Error message
  messageOne.textContent = "Loading...";

  // Removing the previous Forecast Data message
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          //Rendering the Error message
          messageOne.textContent = data.error;
        } else {
          // Rendering the Forecast Data
          messageOne.textContent = `This forecast is for ${data.location}.`;

          messageTwo.textContent = `${data.forecastData}`;
        }
      });
    }
  );
});
