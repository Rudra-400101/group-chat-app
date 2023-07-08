// connection with html css and index.js
const socket = io("http://localhost:7000");
// get elements from html
const form = document.getElementById("send-container");
const message = document.getElementById("messegeinp");
const chatContainer = document.getElementById("text-container");


// make appends function where we can put user name and messeges 
const appends = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageElement.classList.add("msg");
  messageElement.classList.add(position);
  chatContainer.append(messageElement);
};
// get user name and emit new user joined and send data
const names = prompt("Enter your name for joining");
socket.emit("new-user-joined", names);


// get data from user onbject and send messege to another user
socket.on("user-joined", (names) => {
 
// date and time
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const d = date.getDate();
  const mon = date.getMonth();
  const y = date.getFullYear();
  // call appends function and send data
  appends(
  `<p class="time">${h}:${m}:${s} | ${d}-${mon}-${y}</p> <h4 class="name">${names}:</h4> joined the chat `,
    "left"
  );
  // scroll-y 100px
  chatContainer.scrollBy(0, 100);
});

// make Boolean because of on submit down scroll arrow are not show
let hide = true;

// use submit button for send mesage to user
form.addEventListener("submit", (e) => {
  // use prevent default because of do naot reload page
  e.preventDefault();
  // date and time 
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const d = date.getDate();
  const mon = date.getMonth();
  const y = date.getFullYear();
  const messages = message.value;
  if (messages.length >= 1) {
    appends(
      `<p class="time">${h}:${m}:${s} | ${d}-${mon}-${y}</p> <h4 class="name"> you: </h4> ${messages}`,
      "right"
    );
    socket.emit("send", messages);
  }
  message.value = "";
  chatContainer.scrollBy(0, 2000);
  // make hide false while submit and after 100mls make it true because of down arrow will not visible
  hide = false;
  setTimeout(() => {
    hide = true;
  }, 100);
});

socket.on("recieve", (data) => {
  // date and time
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const d = date.getDate();
  const mon = date.getMonth();
  const y = date.getFullYear();
  appends(
    `<p class="time">${h}:${m}:${s} | ${d}-${mon}-${y}</p> <h4 class="name">${data.names}:</h4>${data.message}`,
    "left"
  );
  chatContainer.scrollBy(0, 100);
});
socket.on("leave", (names) => {

  // date and time
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const d = date.getDate();
  const mon = date.getMonth();
  const y = date.getFullYear(); 
  appends(
    `<p class="time">${h}:${m}:${s} | ${d}-${mon}-${y}</p> <h4 class="leave-user">${names}:</h4> Left the chat`,
    "left"
  );
  chatContainer.scrollBy(0, 100);
});


// make which is call on when user click on down scroll arrow
const bottomarrow = () => {
  chatContainer.scrollBy(0, 90000000);
};

// on scroll show down scroll arrow
const downarrow = document.getElementById("down-scroll");
chatContainer.addEventListener("scroll", () => {
  if (hide) {
    downarrow.style.display = "initial";
    setTimeout(() => {
      downarrow.style.display = "none";
    }, 4000);
  }
});


