"use strict"
/** Form selectors */
const costsForm = document.getElementById("costs-form")
const inputDate = document.querySelector("[data-input-date]")
const inputPounds = document.querySelector("[data-input-pounds]")
const inputPence = document.querySelector("[data-input-pence]")
const inputNotes = document.querySelector("[data-input-notes]")

/** Table selectors */
const costsTable = document.getElementById("costs-table")
const tbodyRows = document.querySelector("[data-rows]")

const totalDays = document.querySelector("[data-total-days]")
const totalCosts = document.querySelector("[data-total-costs]")
const averageSpend = document.querySelector("[data-average-spend]")
/* tr template */
const costsTemplate = document.getElementById("costs-template")

/** Local Storage */
const LOCAL_STORAGE_PREFIX = "COSTS_GH_V1"
const COSTS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-data`

const dailyCostsAll = []
const LastChildArray = []

costsForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const dateValue = inputDate.value
  const dateArray = dateValue.split("-")
  const dateString = dateArray.reverse().join("/")
  const notesValue = inputNotes.value

  const gbp = "\u00A3"
  if (inputPounds.value === "") {
    alert(`Enter 0 or greater in the ${gbp} field`)
    return
  }
  if (inputPence.value === "") {
    alert("Enter a number between 0 and 99 in the Pence field")
    return
  }

  const poundsValue = parseInt(inputPounds.value) * 100
  const penceValue = parseInt(inputPence.value)
  const poundsPlusPence = (poundsValue + penceValue) / 100

  const newCostsEntry = {
    date: dateString,
    notesValue: notesValue,
    poundsPlusPence: poundsPlusPence,
    id: new Date().valueOf().toString(),
  }
  entries.push(newCostsEntry)
  renderCostsEntry(newCostsEntry)

  saveentries()

  inputDate.value = ""
  inputPounds.value = 0
  inputPence.value = 0
  inputNotes.value = ""
})

function renderCostsEntry(entry) {
  const templateClone = costsTemplate.content.cloneNode(true)
  const costsRow = templateClone.querySelector(".costs-row")

  costsRow.dataset.entryId = entry.id

  const date = templateClone.querySelector("[data-date]")
  const notes = templateClone.querySelector("[data-notes]")
  const dailyCost = templateClone.querySelector("[data-daily-cost]")

  date.textContent = entry.date
  notes.textContent = entry.notesValue
  dailyCost.textContent = entry.poundsPlusPence

  const totalRows = parseInt(tbodyRows.rows.length + 1)
  totalDays.textContent = totalRows

  dailyCostsAll.push(parseFloat(dailyCost.textContent))
  const costsReduce = dailyCostsAll.reduce((total, cost) => {
    return total + cost
  }, 0)
  totalCosts.textContent = costsReduce.toFixed(2)

  const totalCostsNum = parseFloat(totalCosts.textContent)
  averageSpend.textContent = (totalCostsNum / totalRows).toFixed(2)

  tbodyRows.appendChild(templateClone)
}

let entries = loadentries()
entries.forEach((entry) => renderCostsEntry(entry))

function saveentries() {
  localStorage.setItem(COSTS_STORAGE_KEY, JSON.stringify(entries))
}
function loadentries() {
  const entriesString = localStorage.getItem(COSTS_STORAGE_KEY)
  return JSON.parse(entriesString) || []
}

// Sortable drag and drop
const tbody = document.querySelector(".tbody")
const sortable = Sortable.create(tbody, {
  group: "SORTED-DAILY-COSTS",
  store: {
    /**
     * Get the order of elements. Called once during initialization.
     * @param   {Sortable}  sortable
     * @returns {Array}
     */
    get: function (sortable) {
      const order = localStorage.getItem(sortable.options.group.name)
      return order ? order.split("|") : []
    },
    /**
     * Save the order of elements. Called onEnd (when the item is dropped).
     * @param {Sortable}  sortable
     */
    set: function (sortable) {
      const order = sortable.toArray()
      localStorage.setItem(sortable.options.group.name, order.join("|"))
    },
  },
})

/** Event listeners */
// Delete button
addGlobalEventListener("click", "[data-button-delete]", (e) => {
  // Remove from the screen
  const parent = e.target.closest(".costs-row")
  parent.remove()

  //   // Remove from local storage
  const entryId = parent.dataset.entryId
  entries = entries.filter((entry) => {
    return entry.id !== entryId
  })

  saveentries()
  window.location.reload()
})

// Clear number fields on focus(in)
addGlobalEventListener(
  "focusin",
  "[data-input-number]",
  (e) => {
    e.target.value = ""
  },
  true
)

function addGlobalEventListener(type, selector, callback, option = false) {
  document.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e)
    },
    option
  )
}
