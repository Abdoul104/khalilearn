if (!sessionStorage.getItem("isLoggedIn")) {
    window.location.href = "../index.html";
}

window.onload = function () {
    // Vérifiez si l'utilisateur est connecté
    if (sessionStorage.getItem("isLoggedIn")) {
        // Mettre à jour l'avatar
        document.getElementById("userAvatar").src = sessionStorage.getItem("userAvatar") || "../assets/default-avatar.png";

        // Mettre à jour le nom de l'utilisateur
        document.getElementById("userName").innerText = sessionStorage.getItem("userName") || "";

        // Afficher l'indicateur
        document.getElementById("userStatus").style.display = "block";
    } else {
        // Cacher l'indicateur si non connecté
        document.getElementById("userStatus").style.display = "none";
    }
};