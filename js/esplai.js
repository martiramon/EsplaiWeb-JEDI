$(document).on("scroll",  function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

function logout() {
    localStorage.clear();
    window.location.replace("monitors.html");
}
$(function() {
    $("#formlogin").on({
        submit: async function(e) {
            e.preventDefault();
            if ($('.alert')) $('.alert').remove();
            if ($('#inputEmail3').val() =="") {
                $('#titollogin').after(`<div class="alert alert-danger" role="alert">
                        Email i/o contrassenya incorrectes!
                        </div>`);
            } else {
                try {
                    const response = await axios.get("https://esplaisolnaixent.herokuapp.com/monitors/?Email=" + $('#inputEmail3').val());
                    const data = await response.data;
                    if (data[0]) {
                        if (data[0].password === $('#inputPassword3').val()) {
                            localStorage.setItem('logged', 'true');
                            window.location.replace("monitors.html");
                        } else {
                            $('#titollogin').after(`<div class="alert alert-danger" role="alert">
                            Email i/o contrassenya incorrectes!
                            </div>`);
                        }   
                    } else {
                        $('#titollogin').after(`<div class="alert alert-danger" role="alert">
                        Email i/o contrassenya incorrectes!
                        </div>`);
                    }
                } catch (error) {
                    console.log(error); 
                }
            }
        }
    });
});

$(function() {
    $("#formsignup").on({
        submit: async function(e) {
            e.preventDefault();
            if ($('.alert')) $('.alert').remove();
            if ($('#inputEmail').val() =="" || $('#inputName').val() =="" || $('#inputAge').val() =="" || $('#inputPassword').val() =="") {
                $('#titolregistre').after(`<div class="alert alert-danger" role="alert">
                        Introdueix totes les dades!
                        </div>`);
            } else {
                try {
                    const response = await axios.get("https://esplaisolnaixent.herokuapp.com/monitors/?Email=" + $('#inputEmail3').val());
                    const data = await response.data;
                    if (data[0]) {
                            $('#titolregistre').after(`<div class="alert alert-danger" role="alert">
                            Ja existeix un usuari amb aquest Email!
                            </div>`) 
                    } else {
                        var nom = $('#inputName').val();
                        var edat = $('#inputAge').val();
                        var email = $('#inputEmail').val();
                        var contrasenya = $('#inputPassword').val();
                        var grup = $('input[name=gridRadios]:checked', '#formsignup').val();
                        var monitor = { 'Nom': nom, 'Edat': edat, 'Grup': grup, 'Email': email, 'password': contrasenya}
                        try {
                            const response = await axios.post("https://esplaisolnaixent.herokuapp.com/monitors/", monitor);
                            const data = await response.status;
                            if (data === 201) {
                                console.log("iiiiiiii");
                                alert("Usuari " + nom + " creat, s'ha enviat un correu electrònic de confirmació");
                                localStorage.setItem('logged', 'true');
                                window.location.replace("monitors.html");
                            }  
                        } catch (error) {
                            console.log(error); 
                        }
                    }
                } catch (error) {
                    console.log(error); 
                }
            }
        }
    });
});
  
async function taulaMonitors() {
    try {
        const response = await axios.get("https://esplaisolnaixent.herokuapp.com/monitors");
        const data = await response.data;
        var monitors = data;
        for(var i = 0; i < monitors.length; i++) {
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
    
         var tr = table.insertRow(-1);                   
    
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
    
            for (var i = 0; i < monitors.length; i++) {
    
                tr = table.insertRow(-1);
    
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = monitors[i][col[j]];
                }
            }

            $('#afegir').append('<h1 id="llistamonis">Llista de monitors/es </h1>');
            $('#llistamonis').after(div);
            $('#divtable').append(table);
            $('.table').after(`<button type="button" class="btn btnlila m-1" onclick="logout()">Tancar Sessió</button></div>`)
    } catch (error) {
        console.log(error); 
    }
};

function testLogged() {
if (localStorage.getItem("logged") === null || localStorage.getItem("logged") === "false" ) {
        $('#afegir').append(`<div class="row justify-content-center"> <h5> Aquesta pàgina és privada, només hi poden accedir monitors/es del centre. Si ho ets, inicia sessió o registra't!" </h5> </div> 
        <div class="row justify-content-center"> <button type="button" class="btn btnlila m-1" onclick="window.location.href='login.html';">Iniciar Sessió</button>
        <button type="button" class="btn btnlila m-1" onclick="window.location.href='signup.html';">Registrar-me</button></div>`)
    }
    else {
        taulaMonitors();
    }
}
  