$(document).on("scroll",  function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});
  
async function getMonitors() {
    try {
        const response = await axios.get("https://curso-jedi-web.herokuapp.com/pokemons/");
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error); 
    }
};

function testLogged() {
    
}
  