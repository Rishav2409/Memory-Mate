const card = {
    id: Date.now(),
    question: "What is closure?",
    answer: "Function remembering outer scope",
    status: "new"
}

let cards = []

function loadCards() {
    const saved = localStorage.getItem('memorymate-cards')
    cards = saved ? JSON.parse(saved) : []
}

function saveCards() {
    localStorage.setItem('memorymate-cards', JSON.stringify(cards))
}

loadCards()
console.log(cards)


function addCard() {
    const question = document.getElementById("question-input").value.trim()
    const answer = document.getElementById("answer-input").value.trim()
    if (!question || !answer) return

    const newcard = { id: Date.now(), question, answer, status: "new" }
    cards.push(newcard)
    saveCards()
    renderCards()
}

function renderCards() {
    const container = document.getElementById("cards-container")
    container.innerHTML = ""
    const filtered = getFilteredCards()
    filtered.forEach(card => {
        const cardE1 = createCardElement(card)
        container.appendChild(cardE1)
    })
    updateStats()
}




function createCardElement(card) {
    const div = document.createElement('div')
    div.classList.add('card')
    div.setAttribute('data-id', card.id)
    if (card.status === 'known') div.classList.add('known')
    if (card.status === 'review') div.classList.add('review')

    div.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <p>${card.question}</p>
      </div>
      <div class="card-back">
        <p>${card.answer}</p>
        <button class="know-btn">Know it</button>
        <button class="review-btn">Review again</button>
      </div>
    </div>
    <button class="delete-btn">Delete</button>
  `
    // attach events
    div.querySelector('.card-inner').addEventListener('click', () => {
        div.classList.toggle('flipped')
    })
    div.querySelector('.know-btn').addEventListener('click', (e) => {
        e.stopPropagation()  // prevent flip on button click
        updateStatus(card.id, 'known')
    })
    div.querySelector('.review-btn').addEventListener('click', (e) => {
        e.stopPropagation()
        updateStatus(card.id, 'review')
    })
    div.querySelector('.delete-btn').addEventListener('click', () => {
        deleteCard(card.id)
    })
    return div
}


function updateStatus(id, status) {
    cards = cards.map(c => c.id === id ? { ...c, status } : c)
    saveCards()
    renderCards()
}

// 5. DELETE CARD
function deleteCard(id) {
    cards = cards.filter(c => c.id !== id)
    saveCards()
    renderCards()
}

// 6. FILTER
let currentFilter = 'all'
function getFilteredCards() {
    if (currentFilter === 'all') return cards
    return cards.filter(c => c.status === currentFilter)
}

// 7. UPDATE STATS
function updateStats() {
    document.getElementById('total-count').textContent = `Total: ${cards.length}`
    document.getElementById('known-count').textContent =
        `Known: ${cards.filter(c => c.status === 'known').length}`
    document.getElementById('review-count').textContent =
        `Review: ${cards.filter(c => c.status === 'review').length}`
}

// 8. INIT — runs when page loads
loadCards()
renderCards()
document.getElementById('add-btn').addEventListener('click', addCard)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter
        renderCards()
    })
})
