

let cards = []
let currentFilter = 'all'

// ---------- storage ----------

function loadCards() {
    const saved = localStorage.getItem('memorymate-cards')
    cards = saved ? JSON.parse(saved) : []
}

function saveCards() {
    localStorage.setItem('memorymate-cards', JSON.stringify(cards))
}

// ---------- add ----------

function addCard() {
    const qInput = document.getElementById('question-input')
    const aInput = document.getElementById('answer-input')
    const question = qInput.value.trim()
    const answer = aInput.value.trim()

    if (!question || !answer) {
        const target = !question ? qInput : aInput
        target.classList.add('input-error')
        target.focus()
        setTimeout(() => target.classList.remove('input-error'), 600)
        return
    }

    const newCard = { id: Date.now(), question, answer, status: 'new' }
    cards.unshift(newCard)
    saveCards()

    qInput.value = ''
    aInput.value = ''
    qInput.focus()
    renderCards()
}

// ---------- render ----------

function renderCards() {
    const container = document.getElementById('cards-container')
    container.innerHTML = ''
    const filtered = getFilteredCards()

    if (filtered.length === 0) {
        const msg = document.createElement('p')
        msg.className = 'empty-msg'
        msg.textContent = cards.length === 0
            ? 'No cards yet. Add one above to start studying!'
            : `No ${currentFilter} cards right now.`
        container.appendChild(msg)
        updateStats()
        return
    }

    filtered.forEach(card => container.appendChild(createCardElement(card)))
    updateStats()
}

function createCardElement(card) {
    const div = document.createElement('div')
    div.classList.add('card')
    div.setAttribute('data-id', card.id)
    if (card.status === 'known') div.classList.add('known')
    if (card.status === 'review') div.classList.add('review')

    const inner = document.createElement('div')
    inner.className = 'card-inner'

    const front = document.createElement('div')
    front.className = 'card-front'
    const frontText = document.createElement('p')
    frontText.textContent = card.question
    front.appendChild(frontText)

    const back = document.createElement('div')
    back.className = 'card-back'
    const backText = document.createElement('p')
    backText.textContent = card.answer
    back.appendChild(backText)

    const knowBtn = document.createElement('button')
    knowBtn.className = 'know-btn'
    knowBtn.textContent = 'Know it'
    knowBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        updateStatus(card.id, 'known')
    })

    const reviewBtn = document.createElement('button')
    reviewBtn.className = 'review-btn'
    reviewBtn.textContent = 'Review again'
    reviewBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        updateStatus(card.id, 'review')
    })

    back.appendChild(knowBtn)
    back.appendChild(reviewBtn)

    inner.appendChild(front)
    inner.appendChild(back)

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.textContent = '✕'
    deleteBtn.setAttribute('aria-label', 'Delete card')
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        deleteCard(card.id)
    })

    inner.addEventListener('click', () => div.classList.toggle('flipped'))

    div.appendChild(inner)
    div.appendChild(deleteBtn)
    return div
}

// ---------- status / delete ----------

function updateStatus(id, status) {
    cards = cards.map(c => c.id === id ? { ...c, status } : c)
    saveCards()
    renderCards()
}

function deleteCard(id) {
    cards = cards.filter(c => c.id !== id)
    saveCards()
    renderCards()
}

// ---------- filter ----------

function getFilteredCards() {
    if (currentFilter === 'all') return cards
    return cards.filter(c => c.status === currentFilter)
}

// ---------- stats ----------

function updateStats() {
    document.getElementById('total-count').textContent = `Total: ${cards.length}`
    document.getElementById('known-count').textContent =
        `Known: ${cards.filter(c => c.status === 'known').length}`
    document.getElementById('review-count').textContent =
        `Review: ${cards.filter(c => c.status === 'review').length}`
}

// ---------- init ----------

loadCards()
renderCards()

document.getElementById('add-btn').addEventListener('click', addCard)

document.getElementById('answer-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addCard()
})
document.getElementById('question-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('answer-input').focus()
})

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        renderCards()
    })
})
