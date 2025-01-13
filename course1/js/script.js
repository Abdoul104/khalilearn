sessionStorage.clear();

var students = [];

// Chargement des données depuis data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        students = data.students; 
        // Assurez-vous que les données correspondent au format
        console.log(students);
    })
    .catch(error => console.error('Erreur de chargement des données:', error));

// Vérification des identifiants
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    console.log(students);

    const password = document.getElementById("password").value.trim();
    const numInscription = document.getElementById("numInscription").value.trim();

    const student = students.find(
        s => s.num_ins === numInscription && s.password === password
    );

    if (student) {
        // Enregistrement des données dans sessionStorage
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("activeStudent", JSON.stringify(student));

        // Redirection vers le tableau de bord
        window.location.href = "dashboard.html";
    } else {
        // Affichage du message d'erreur
        const errorMessage = document.getElementById("loginError");
        errorMessage.style.display = "block";
        errorMessage.innerText = "Mot de passe ou numéro d'inscription incorrect.";
    }
});

//Animation au défilement
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
                //Stop observer après l'animation
            }
        });
    }, { threshold: 0.1});

    elements.forEach(element => observer.observe(element));
});
