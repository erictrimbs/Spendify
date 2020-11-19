// Inspired by https://code.tutsplus.com/tutorials/how-to-draw-a-pie-chart-and-doughnut-chart-using-javascript-and-html5-canvas--cms-27197
function updateDonutChart(history) {
    // Donut chart related constants and objects
    const canvasEl = document.getElementById('donut-chart');
    const legendEl = document.getElementById('donut-legend');
    const canvasWidth = canvasEl.width;
    const canvasHeight = canvasEl.height;
    const donutXY = Math.min(canvasWidth / 2, canvasHeight / 2);
    const outerRadius = 0.8 * donutXY;
    const textRadius  = 0.6 * donutXY;
    const innerRadius = 0.4 * donutXY;
    const ctx = canvasEl.getContext('2d');
    const backgroundColor = 'white';
    const textColor = 'black';
    const textFont = '15px Arial';
    const sliceColors = [
        'red', 'orange', 'yellow', 'green', 'blue', 'purple'
    ];
    const legendEntrySize = 30;
    // Category value crunching
    const categoryAmounts = {};
    let totalAmount = 0;
    for (const entry of history) {
        let amount = +entry.amount; // Coerce amount string to number
        if (amount !== amount) {
            continue; // Don't add malformed (NaN) amounts
        }
        const categories = Array.isArray(entry.category) ? entry.category : [entry.category];
        for (const category of categories) {
            if (category in categoryAmounts) {
                categoryAmounts[category] += amount;
            } else {
                categoryAmounts[category] = amount;
            }
            totalAmount += amount;
        }
    }
    const categoriesAmounts = Object.entries(categoryAmounts);
    categoriesAmounts.sort(([_1, a1], [_2, a2]) => a2 - a1);
    // Create "Other" slice if too many slices
    if (categoriesAmounts.length > sliceColors.length) {
        const remainingAmount = categoriesAmounts.splice(sliceColors.length - 1)
            .reduce((acc, elt) => acc + elt[1], 0);
        categoriesAmounts.push(['Other', remainingAmount]);
    }
    // The holy circle constant tau
    const tau = 2 * Math.PI;
    // Set donut chart background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // Create donut slices and legend
    let sliceAngle = 0;
    let legendY = canvasHeight / 2 - categoriesAmounts.length * legendEntrySize / 2;
    for (let i = 0; i < categoriesAmounts.length; i++) {
        const [category, amount] = categoriesAmounts[i];
        const proportion = amount / totalAmount;
        const sliceSize = tau * proportion;
        // Create slice
        ctx.fillStyle = sliceColors[i];
        ctx.beginPath();
        ctx.moveTo(donutXY, donutXY);
        ctx.arc(donutXY, donutXY, outerRadius, sliceAngle, sliceAngle + sliceSize);
        ctx.closePath();
        ctx.fill();
        // Create legend entry color
        ctx.beginPath();
        ctx.moveTo(donutXY * 2, legendY);
        ctx.arc(donutXY * 2, legendY, 0.45 * legendEntrySize, 0, tau);
        ctx.closePath();
        ctx.fill();
        // Create legend entry text
        ctx.fillStyle = textColor;
        ctx.font = textFont;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText(category, donutXY * 2 + 0.6 * legendEntrySize, legendY);
        legendY += legendEntrySize;
        // Create percentage text
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(
            `${Math.round(100 * proportion)}%`,
            donutXY + textRadius * Math.cos(sliceAngle + sliceSize / 2),
            donutXY + textRadius * Math.sin(sliceAngle + sliceSize / 2)
        );
        sliceAngle += sliceSize;
    }
    // Create donut hole
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.moveTo(donutXY, donutXY);
    ctx.arc(donutXY, donutXY, innerRadius, 0, tau);
    ctx.closePath();
    ctx.fill();
}

function dateToYM(date) {
    const month = date.getMonth() + 1;
    return month < 10 ? `${date.getFullYear()}-0${month}` : `${date.getFullYear()}-${month}`;
}

function updateSpendingGraph(history) {
    // Spending graph related constants and objects
    const canvasEl = document.getElementById('spending-graph');
    const canvasWidth = canvasEl.width;
    const canvasHeight = canvasEl.height;
    const ctx = canvasEl.getContext('2d');
    const margin = 0.05;
    const backgroundColor = 'white';
    const barColor = 'blue';
    const textColor = 'black';
    const textFont = '10px Arial';
    const headingFont = '20px Arial';
    const mos = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    // Month value crunching
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1); // Go back one year
    const startYear = startDate.getFullYear();
    const startMonth = mos[startDate.getMonth()];
    history = history.filter(({ date }) => startDate.getTime() < Date.parse(date));
    const months = {};
    while (dateToYM(startDate) <= dateToYM(new Date())) {
        months[dateToYM(startDate)] = 0;
        startDate.setMonth(startDate.getMonth() + 1);
    }
    for (const entry of history) {
        const amount = +entry.amount;
        if (amount === amount) { // Don't add malformed (NaN) amounts
            months[dateToYM(new Date(entry.date))] += amount;
        }
    }
    const monthEntries = Object.entries(months);
    monthEntries.sort(([ym1, a1], [ym2, a2]) => ym1 < ym2);
    let greatestAmount = monthEntries.reduce((acc, elt) => Math.max(acc, elt[1]), 0);
    // Set background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // Create spending graph
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    const monthDiff = monthEntries.length * canvasWidth * (1 - margin * 2);
    let x = canvasWidth * margin;
    for (let i = 0; i < monthEntries.length; i++) {
        let barHeight = monthEntries[i][1] / greatestAmount * canvasHeight * 0.6;
        if (barHeight !== barHeight) {
            barHeight = 0;
        }
        ctx.fillStyle = barColor;
        ctx.fillRect(x - 10, canvasHeight * 0.8 - barHeight, 20, barHeight);
        ctx.fillStyle = textColor;
        ctx.fillText(mos[+monthEntries[i][0].substring(5) - 1], x, canvasHeight * 0.81);
        x += canvasWidth * (1 - margin * 2) / (monthEntries.length - 1);
    }
    ctx.textBaseline = 'middle';
    ctx.font = headingFont;
    ctx.fillText(`Monthly Spending since ${startMonth} ${startYear}`, canvasWidth / 2, canvasHeight * 0.1);
}

function updateSuggestions(history) {
    const monthlySpendingEl = document.getElementById('monthly-spending');
    const categorySpendingEl = document.getElementById('category-spending');
    // Suggestion to keep this month's spending below average
    let earliestDate = new Date();
    for (const entry of history) {
        const entryDate = new Date(entry.date);
        if (entryDate < earliestDate) {
            earliestDate = entryDate;
        }
    }
    const months = {};
    while (new Date(dateToYM(earliestDate) + '-01').getTime() <= Date.now()) {
        console.log(dateToYM(earliestDate));
        months[dateToYM(earliestDate)] = 0;
        earliestDate.setMonth(earliestDate.getMonth() + 1);
    }
    for (const entry of history) {
        const amount = +entry.amount;
        if (amount === amount) { // Don't add malformed (NaN) amounts
            months[dateToYM(new Date(entry.date))] += amount;
        }
    }
    const monthValues = Object.values(months);
    let averageMonthlySpending = monthValues.reduce((acc, elt) => acc + elt) / monthValues.length;
    if (averageMonthlySpending === 0) {
        averageMonthlySpending = 1;
    }
    console.log(dateToYM(new Date()));
    const currentMonthlySpending = months[dateToYM(new Date())];
    monthlySpendingEl.textContent = `$${currentMonthlySpending} was spent this month, ${Math.round(100 * currentMonthlySpending / averageMonthlySpending)}% of your average. `;
    if (currentMonthlySpending < averageMonthlySpending) {
        monthlySpendingEl.textContent += 'Keep it up!';
    } else {
        monthlySpendingEl.textContent += 'Try reducing it!'
    }
    // Suggestion to lower top category spending
    const categoryAmounts = {};
    for (const entry of history) {
        let amount = +entry.amount; // Coerce amount string to number
        if (amount !== amount) {
            continue; // Don't add malformed (NaN) amounts
        }
        const categories = Array.isArray(entry.category) ? entry.category : [entry.category];
        for (const category of categories) {
            if (category in categoryAmounts) {
                categoryAmounts[category] += amount;
            } else {
                categoryAmounts[category] = amount;
            }
        }
    }
    const categoriesAmounts = Object.entries(categoryAmounts);
    const [cat, amt] = categoriesAmounts.reduce((acc, elt) => acc[1] > elt[1] ? acc : elt);
    categorySpendingEl.textContent = `${cat} has cost you $${amt}, the most of any category. Try reducing it!`;
}

window.addEventListener('load', async () => {
    const response = await fetch('/historyEntries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({}) // Fetch full history (include no filters)
    });
    const history = await response.json();
    if (history.length > 0) {
        updateDonutChart(history);
        updateSpendingGraph(history);
        updateSuggestions(history);
    }
});