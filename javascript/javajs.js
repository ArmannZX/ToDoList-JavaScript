const input = document.getElementById("input");
const button = document.getElementById("button");
const lists = document.getElementById("Lists");
const icons = document.getElementsByTagName("i");
const topics = document.getElementsByTagName("p");
let counter = 1;
let Topic;

if (!window.localStorage.getItem("TopicKey")) {
  Topic = [];
} else {
  let value = window.localStorage.getItem("TopicKey").split(",");
  Topic = [value];
}
button.addEventListener("click", function () {
  let topic = input.value;
  lists.appendChild(CreateTopic(topic, counter));
  SaveTopicStorage(topic);
  input.value = "";
  counter++;
});

function CreateTopic(InnerText, TopicNumber) {
  let NewElemnt = document.createElement("p");
  NewElemnt.innerHTML = TopicNumber + ". " + InnerText;
  NewElemnt.innerHTML += `<span class="spanoff">Done!</span><i class="fa-solid fa-trash-can">`;
  return NewElemnt;
}

lists.addEventListener("click", function (event) {
  let Target = event.target;
  let value = window.localStorage.getItem("TopicKey").split(",");
  if (Target.nodeName == "I") {
    Target.parentElement.style.display = "none";
    value.splice(value.indexOf(Target.parentElement.textContent), 1);
    window.localStorage.setItem("TopicKey", value);
    counter--;
  }
  if (Target.nodeName == "P") {
    Target.classList.toggle("DoneTopic");
    Target.firstChild.nextElementSibling.classList.toggle("spanon");
  }
});

function SaveTopicStorage(Entry) {
  Topic.push(Entry);
  window.localStorage.setItem("TopicKey", Topic);
}

function ShowSavedTopics() {
  let value = window.localStorage.getItem("TopicKey").split(",");
  for (const iterator of value) {
    lists.appendChild(CreateTopic(iterator, counter));
    counter++;
  }
}

// window.localStorage.removeItem('TopicKey')
