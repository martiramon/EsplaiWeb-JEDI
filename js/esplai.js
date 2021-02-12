$(document).on("scroll",  function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});
  
async function getMonitors() {
    try {
        const response = await axios.get("https://esplaisolnaixent.herokuapp.com/monitors");
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error); 
    }
};

function testLogged() {

    var monitors = getMonitors();
    
    for(var i = 0; i < monitors.length; i++) {
        delete monitors[i]['id'];
        delete monitors[i]['password'];
    }

    var col = [];
    for (var i = 0; i < monitors.length; i++) {
        for (var key in monitors[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var div = document.createElement("div");
    div.className = "table-responsive";
    div.id = "divtable";
    var table = document.createElement("table");
    table.className = "table";

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < monitors.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = monitors[i][col[j]];
            }
        }
        
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        $('#afegir').append('<h1 id="llistamonis">Llista de monitors/es </h1>');
        $('#llistamonis').after(div);
        $('#divtable').append(table);





    /*if (localStorage.getItem("logged") === null || localStorage.getItem("logged") === false ) {
        $('.afegir').append(`<div class="row justify-content-center"> <h5> Aquesta pàgina és privada, només hi poden accedir monitors/es del centre. Si ho ets, inicia sessió o registra't!" </h5> </div> 
        <div class="row justify-content-center"> <button type="button" class="btn btnlila">Iniciar Sessió</button>
        <button type="button" class="btn btnlila">Registrar-me</button></div>`)
    }
    else {
        var monitors = getMonitors();

    }*/
}
  