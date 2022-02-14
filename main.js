const tickets = [];

const button_ask_help = document.getElementById("ask_help");

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

function addNewLine(name, date) {
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
  td_2.appendChild(button);

  tr.appendChild(td_0);
  tr.appendChild(td_1);
  tr.appendChild(td_2);

  const table = document.getElementById("table");
  table.appendChild(tr);
}

function addNewTicket(name) {
  const date = new Date();
  tickets.push([name, date]);
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

function renderTable(tickets) {
  removeRows();
  for (let i = 0; i < tickets.length; ++i) {
    const mon_ticket = tickets[i];
    const name = mon_ticket[0];
    const date = mon_ticket[1];
    addNewLine(name, date);
  }
}

// fonction clickHandler sur le bouton "je veux de l'aide" :
//   Récupérer la valeur du champ texte d'input : OK
//   Stocker la valeur récupérée dans une variable d'état interne du programme : OK
//   Vider le champ texte d'input : OK
//   Récupérer la date et l'heure du moment où l'utilisateur à clicker sur le bouton : OK
//   Ajouter la valeur récupérée, la date et l'heure du click et un
//    bouton "je passe mon tour" dans un tableau visible par l'utilisateur
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
  renderTable(tickets);
});
