function generateRuler() {
    return `<div class="ruler">
        ${
            new Array(24).fill(0).map((x, i) => i.toString())
            .flatMap(
                (hour) => new Array(4).fill(0).map((x, i) => (i * 15).toString())
                    .map((minutes) => `<div data-start-time="${hour.padStart(2, '0')}${minutes.padStart(2, 0)}"></div>`)
            ).join('')
        }
    </div>`;
}

function generateEvents(events) {
    return events.map(
        ({ from, to, id, group = 'group1', justStart = false, justEnd = false }, index) => 
            `<div class="${
                ['event', justStart && 'just-start', justEnd && 'just-end'].filter(x => x).join(' ')
            }"${ id ? ` data-id="${id}"` : '' } data-group="${group}" data-start-time="${from}" data-end-time="${to}"></div>`
    ).join("\n");
}

function generateCalendar(events) {
    return `<div class="timeline" data-auto-animate>
        ${generateRuler()}
        ${generateEvents(events)}
    </div>`
}

console.log(generateEvents([
    { from: '0800', to: '2000' }
]))