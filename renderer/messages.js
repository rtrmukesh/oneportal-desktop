const messages = [
    "Hi Mapula!",
    "Welcome to OnePortal",
    "You have 3 unread messages."
  ];
  
  const ul = document.getElementById("messageList");
  
  messages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    ul.appendChild(li);
  });
  