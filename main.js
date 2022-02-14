const tickets = [];
let id = 0;

function computeFormattedDate(date) {
  function padding(x) {
    return String(x).padStart(2, "0");
  }

  return `${padding(date.getDate())}/${padding(
    date.getMonth() + 1
  )}/${date.getFullYear()}, ${padding(date.getHours())}:${padding(
    date.getMinutes()
  )}:${padding(date.getSeconds())}`;
}

function passedTicketById(current_id) {
  let found_index = -1;
  for (let i = 0; i < tickets.length; ++i) {
    const current_ticket = tickets[i];
    if (current_ticket[0] === current_id) {
      current_ticket[3] = "passed";
      found_index = i;
      break;
    }
  }
  return found_index;
}

function addNewLine(ticket, hasAnimation) {
  const id = ticket[0];
  const name = ticket[1];
  const date = ticket[2];
  const state = ticket[3];
  const tr = document.createElement("tr");
  const td_0 = document.createElement("td");
  const td_1 = document.createElement("td");
  const td_2 = document.createElement("td");

  td_0.textContent = name;
  const date_formatted = computeFormattedDate(date);
  td_1.textContent = date_formatted;
  const button = document.createElement("button");
  button.classList.add(["passe_mon_tour"]);
  button.textContent = "Je passe mon tour";
  button.value = id;

  button.addEventListener("click", (event) => {
    const current_id = parseInt(event.target.value);
    const index_animation = passedTicketById(current_id);

    renderTable(tickets, index_animation);
  });

  if (state === "waiting") {
    td_2.appendChild(button);
  }

  tr.appendChild(td_0);
  tr.appendChild(td_1);
  tr.appendChild(td_2);

  tr.classList.add(["line"]);

  const table = document.getElementById("table");
  table.appendChild(tr);

  if (state === "passed") {
    if (hasAnimation) {
      setTimeout(() => {
        tr.classList.add(["gris"]);
      }, 0);
    } else {
      tr.classList.add(["gris"]);
    }
  }

  if (state === "done") {
    if (hasAnimation) {
      setTimeout(() => {
        tr.classList.add(["done"]);
      }, 0);
    } else {
      tr.classList.add(["done"]);
    }
  }
}

function addNewTicket(name) {
  const date = new Date();
  tickets.push([id, name, date, "waiting"]);
  ++id;
}

function removeRows() {
  const table = document.getElementById("table");

  const toRemove = [];
  for (let i = 0; i < table.childNodes.length; ++i) {
    const current_node = table.childNodes[i];
    if (current_node.nodeName === "TR") {
      toRemove.push(current_node);
    }
  }

  for (let i = 0; i < toRemove.length; ++i) {
    const node_to_remove = toRemove[i];
    node_to_remove.remove();
  }
}

function renderTable(tickets, indexAnimation) {
  removeRows();
  for (let i = 0; i < tickets.length; ++i) {
    const ticket = tickets[i];
    addNewLine(ticket, indexAnimation === i);
  }
}

// fonction clickHandler sur le bouton "je veux de l'aide" :
//   Récupérer la valeur du champ texte d'input : OK
//   Stocker la valeur récupérée dans une variable d'état interne du programme : OK
//   Vider le champ texte d'input : OK
//   Récupérer la date et l'heure du moment où l'utilisateur à clicker sur le bouton : OK
//   Ajouter la valeur récupérée, la date et l'heure du click et un
//    bouton "je passe mon tour" dans un tableau visible par l'utilisateur

const button_ask_help = document.getElementById("ask_help");

button_ask_help.addEventListener("click", () => {
  const input_name = document.getElementById("name");
  const input_text = input_name.value;
  if (input_text === "") {
    return;
  }
  input_name.value = "";

  // Ajout d'un nouveau ticket dans la variable globale 'tickets'
  addNewTicket(input_text);

  // Rendu du tableau dans l'HTML à partir des données de 'tickets'
  renderTable(tickets, -1);
});

const button_refresh = document.getElementById("refresh");

button_refresh.addEventListener("click", () => {
  const indexes_to_delete = [];
  for (let i = 0; i < tickets.length; ++i) {
    const current_ticket = tickets[i];
    const state = current_ticket[3];
    if (state === "passed") {
      indexes_to_delete.push(i);
    }
  }

  indexes_to_delete.reverse();
  for (let i = 0; i < indexes_to_delete.length; ++i) {
    const index = indexes_to_delete[i];
    tickets.splice(index, 1);
  }

  // Rendu du tableau dans l'HTML à partir des données de 'tickets'
  renderTable(tickets, -1);
});

const button_next = document.getElementById("next");

function toNextTicket() {
  let index_to_move = -1;
  for (let i = 0; i < tickets.length; ++i) {
    const current_ticket = tickets[i];
    const state = current_ticket[3];
    if (state === "waiting") {
      current_ticket[3] = "done";
      index_to_move = i;
      break;
    }
  }

  if (index_to_move !== -1) {
    const ticket_to_move = tickets[index_to_move];
    tickets.splice(index_to_move, 1);
    tickets.push(ticket_to_move);
    return tickets.length - 1;
  } else {
    return -1;
  }
}

button_next.addEventListener("click", () => {
  const indexAnimation = toNextTicket();

  // Rendu du tableau dans l'HTML à partir des données de 'tickets'
  renderTable(tickets, indexAnimation);
});

// addNewTicket("toto");
// addNewTicket("tata");
// toNextTicket();
// renderTable(tickets);
