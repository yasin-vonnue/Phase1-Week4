import {
  addRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} from "./indexedDB.js";

const lists = document.querySelectorAll(".kanban-list");

const addButtons = document.querySelectorAll(".add-card");

async function loadCards() {
  const cards = await getAllRecords();

  cards.forEach((card) => {
    renderCard(card);
  });

  console.log("Cards loaded from IndexedDB:", cards);
}

function renderCard(card) {
  const list = document.querySelector(
    `.kanban-list[data-status="${card.status}"]`,
  );

  if (!list) {
    return;
  }

  const cardElement = document.createElement("article");

  cardElement.className = "kanban-card";
  cardElement.dataset.id = card.id;

  cardElement.innerHTML = `
    <h3>${card.title}</h3>

    <div class="card-actions">
      <button
        type="button"
        class="move-card"
        data-id="${card.id}"
      >
        Move
      </button>

      <button
        type="button"
        class="delete-card"
        data-id="${card.id}"
      >
        Delete
      </button>
    </div>
  `;

  list.append(cardElement);
}

async function createCard(status) {
  const title = window.prompt("Enter card title:");

  if (!title?.trim()) {
    return;
  }

  const card = {
    id: crypto.randomUUID(),
    title: title.trim(),
    status,
    updatedAt: Date.now(),
    synced: false,
  };

  await addRecord(card);

  renderCard(card);

  console.log("Card added to IndexedDB:", card);
}

async function moveCard(cardId) {
  const card = await getAllRecords();

  const currentCard = card.find((item) => item.id === cardId);

  if (!currentCard) {
    return;
  }

  const statuses = ["todo", "progress", "done"];

  const currentIndex = statuses.indexOf(currentCard.status);

  const nextStatus = statuses[(currentIndex + 1) % statuses.length];

  currentCard.status = nextStatus;
  currentCard.updatedAt = Date.now();
  currentCard.synced = false;

  await updateRecord(currentCard);

  await refreshBoard();

  console.log("Card updated in IndexedDB:", currentCard);
}

async function removeCard(cardId) {
  await deleteRecord(cardId);

  await refreshBoard();

  console.log("Card deleted from IndexedDB:", cardId);
}

async function refreshBoard() {
  lists.forEach((list) => {
    list.replaceChildren();
  });

  await loadCards();
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    createCard(button.dataset.status);
  });
});

document.addEventListener("click", (event) => {
  const moveButton = event.target.closest(".move-card");

  if (moveButton) {
    moveCard(moveButton.dataset.id);
    return;
  }

  const deleteButton = event.target.closest(".delete-card");

  if (deleteButton) {
    removeCard(deleteButton.dataset.id);
  }
});

export async function initKanban() {
  await loadCards();
}

export async function syncPendingChanges() {
  const cards = await getAllRecords();

  const pendingCards = cards.filter((card) => card.synced === false);

  if (pendingCards.length === 0) {
    console.log("No pending changes to sync.");

    return;
  }

  console.log("Syncing pending changes:", pendingCards);

  for (const card of pendingCards) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(card),
        },
      );

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.status}`);
      }

      const result = await response.json();

      console.log("Synced card:", card.id, result);

      await updateRecord({
        ...card,
        synced: true,
        syncedAt: Date.now(),
      });
    } catch (error) {
      console.error(`Failed to sync card ${card.id}:`, error);
    }
  }
}
