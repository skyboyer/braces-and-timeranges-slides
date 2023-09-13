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
        ({ from, to, id, group = 'group1', justStart = false, justEnd = false, className, label }, index) => 
            `<div class="${
                ['event', justStart && 'just-start', justEnd && 'just-end', className].filter(x => x).join(' ')
            }"${ 
                id ? ` data-id="${id}"` : '' 
            } data-group="${group}"${
                from ? ` data-start-time="${from}"` : ''
            }${
                to ? ` data-end-time="${to}"`: ''
            }${
                label ? ` data-label="${label}"`: ''
            }></div>`
    ).join("\n");
}

function generateCalendar(events) {
    return `<div class="timeline" data-auto-animate>
        ${generateRuler()}
        ${generateEvents(events)}
    </div>`
}

function splitToEdges(events, options = {}) {
    const { braces } = options;
    return events.flatMap(({ from, to, ...data }) => [
        { from, justStart: true, ...data, label: braces ? '(' : '' },
        { to, justEnd: true, ...data, label: braces ? ')' : '' },
    ]);
}

function setGroup(events, targetGroup) {
    return events.map(({ group, ...data }) => ({ ...data, group: targetGroup }))
}

function setClass(events, className) {
    return events.map((event) => ({ ...event, className }));
}

const sourceEvents = [
    { from: '0800', to: '1030', id: 'event-1', group: 'group1' },
    { from: '0900', to: '0930', id: 'event-2', group: 'group2' },
    { from: '0930', to: '1100', id: 'event-3', group: 'group3' },
    { from: '1030', to: '1200', id: 'event-4', group: 'group2' }
];

console.log(
    generateEvents(
        splitToEdges(
            setClass(
                setGroup(sourceEvents, 'group1')
            ),
            { braces: true }
        )
    )
)