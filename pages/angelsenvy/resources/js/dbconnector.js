var connector = new window.AngelsEnvyAPIConnector();
let tbody = document.querySelector("tbody");

window.addEventListener('load', function(){
    async function getLeaderboardData() {
        console.log('getting leaderboard data');
        const result = await connector.leaderboard();
        console.log("Results: ", result);
        
        // Sort result array by the numbers of trees in last column
        result.sort((a, b) => {
            const lastColumnA = parseInt(a[Object.keys(a)[Object.keys(a).length - 1]]);
            const lastColumnB = parseInt(b[Object.keys(b)[Object.keys(b).length - 1]]);
            return lastColumnB - lastColumnA;
        });
        
        // Clear existing rows from tbody
        tbody.innerHTML = "";
        
        result.forEach((item, index) => {
            if (Object.keys(item).length === 0 || Object.values(item).every(value => value === "")) {
            return; // Skip empty or all-blank rows
            }
        
            let tr = document.createElement("tr");
            let numberCell = document.createElement("td");
            numberCell.innerHTML = index + 1;
            tr.appendChild(numberCell);
        
            for (const property in item) {
            let td = document.createElement("td");
            let value = item[property];
            td.innerHTML = value;
            tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    }
    getLeaderboardData();     
});
