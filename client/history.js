async function entriesSync(options) {
    if (options === undefined) {
      options = {'username': window.localStorage.getItem('spendify_username')};
    }
    const t1 = await fetch('/historyEntries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(options)
    });
    if (!t1.ok) {
        console.log(t1.error);
        return;
    }
    const fp1 = await t1.json();
    render_history_table(document.getElementById("historytable"), fp1);
}
entriesSync();

document.getElementById('addbutton').addEventListener('click', async () => {
            const obj = {};
            obj.username = window.localStorage.getItem('spendify_username');
            obj.date = document.getElementById("dateadd").value;
            obj.amount = document.getElementById("amountadd").value;
            obj.category = document.getElementById("categoryadd").value;
            obj.description = document.getElementById("descriptionadd").value;
           
            await fetch("/addEntry", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            
            await entriesSync({'username': window.localStorage.getItem('spendify_username')});
});

document.getElementById('filterbutton').addEventListener('click', () => {
  const options = {};
  const filterValues = ['date', 'amount', 'category', 'description'];
  for (const filterValue of filterValues) {
    const value = document.getElementById(`${filterValue}filter`).value;
    if (value !== '') {
      options[filterValue] = value;
    }
  }
  entriesSync(options);

});

function render_history_table(element, arr) {
    element.innerHTML = '';

    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblHead = document.createElement("thead");

    for (let i = 0; i < 1; i++) {
        // creates a table row
        const row = document.createElement("tr");
    
        for (let j = 0; j < 4; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          const cell = document.createElement("th");
          let cellText;
          if(j === 0) {
              cellText = document.createTextNode("----------Date----------");
          }
          if(j === 1) {
              cellText = document.createTextNode("----------Amount----------");
          }
          if(j === 2) {
              cellText = document.createTextNode("----------Category----------");
          }
          if(j === 3) {
              cellText = document.createTextNode("----------Description----------");
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
    
        // add the row to the end of the table body
        tblHead.appendChild(row);
      }

    const tblBody = document.createElement("tbody");
  
    // creating all cells
    for (let i = 0; i < arr.length; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j < 4; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        let cellText;
        if(j === 0) {
            cellText = document.createTextNode(arr[i].date);
        }
        if(j === 1) {
            cellText = document.createTextNode("$" + arr[i].amount);
        }
        if(j === 2) {
            cellText = document.createTextNode(arr[i].category);
        }
        if(j === 3) {
            cellText = document.createTextNode(arr[i].description);
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
    
    // put the <tbody> in the <table>
    tbl.appendChild(tblHead);
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    element.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}