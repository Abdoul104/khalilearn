const student = JSON.parse(sessionStorage.getItem("activeStudent"));

if (!student) {
    alert("Veuillez vous connecter pour accéder à votre tableau de bord.");
    window.location.href = "../index.html";
}

if (student) {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("activeStudent", JSON.stringify(student)); // Stocker les données complètes
} else {
    // alert("Identifiant ou numéro d'inscription incorrect.");
}

document.addEventListener("DOMContentLoaded", () => {
    // Section 1 : Informations personnelles
    document.getElementById("personalInfo").innerHTML = `
        <table class="table table-striped">
            <tr><td class="fw-bold">Numéro d'inscription</td><td>${student.num_ins}</td></tr>
            <tr><td class="fw-bold">Nom</td><td>${student.nom}</td></tr>
            <tr><td class="fw-bold">Prénom</td><td>${student.prenom}</td></tr>
            <tr><td class="fw-bold">Email</td><td>${student.email}</td></tr>
            <tr><td class="fw-bold">Date d'inscription</td><td>${student.date_ins}</td></tr>
            <tr><td class="fw-bold">Statut</td><td class="text-success">${student.statut_ins}</td></tr>
        </table>
    `;

    // Section 2 : Ressources pédagogiques
    document.getElementById("resources").innerHTML = `
        <table class="table table-striped">
            <tr><td class="fw-bold">Vos cours</td><td><a href="course1.html" class="btn btn-link">Cliquez ici</a></td></tr>
            <tr><td class="fw-bold">Vos évaluations</td><td><a href="eval_course1.html" class="btn btn-link">Cliquez ici</a></td></tr>
        </table>
    `;

    // Section 3 : Informations de la formation
    if (student && student.formation) {
        document.getElementById("trainingInfo").innerHTML = `
            <table class="table table-striped">
                <tr><td class="fw-bold">Intitulé de la formation</td><td>${student.formation.intitule}</td></tr>
                <tr><td class="fw-bold">Durée</td><td>${student.formation.duree}</td></tr>
                <tr><td class="fw-bold">Statut</td><td class="text-success">${student.formation.statut}</td></tr>
                <tr><td class="fw-bold">Notes obtenues</td><td>${student.formation.notes.join('<strong> | </strong> ')}</td></tr>
                <tr><td class="fw-bold">Moyenne obtenue</td><td>${student.formation.moyenne}/20</td></tr>
                <tr><td class="fw-bold">Présence</td><td>${student.formation.presence}</td></tr>
                <tr><td class="fw-bold">Frais d'inscription</td><td>${student.formation.frais}</td></tr>
                <tr>
                    <td><button class="btn btn-success fw-bold" onclick="checkEligibility()">Eligibilité ?</button></td>
                    <td><button class="btn btn-primary fw-bold" onclick="validateCertificate()">Certificat ?</button></td> 
                </tr>
                <tr><div id="message" class="mt-4 fw-bold"></div></tr>
            </table>
        `;
    }
});

// Fonction pour vérifier l'éligibilité
function checkEligibility() {
    const student = JSON.parse(sessionStorage.getItem("activeStudent"));

    if (student) {
        // Vérifier les conditions d'éligibilité
        if (student.statut_ins === "inscrit" && student.moy_apprenant >= 12 && student.ps_total >= 8 && student.frais_fi >= 6000) {
            const mention = determineMention(student.moy_apprenant);
            displayMessage(
                `🎉 Félicitations, vous êtes éligible au certificat de fin de formation avec une mention de <strong>${mention}</strong>.`,
                "alert-success"
            );
        } else {
            displayMessage(
                `❌ Désolé, vous n'êtes pas éligible au certificat de fin de formation.`,
                "alert-danger"
            );
        }
    } else {
        displayMessage("Erreur : Aucune information trouvée pour l'utilisateur connecté.", "alert-danger");
    }
}

// Fonction pour valider le certificat
function validateCertificate() {
    const student = JSON.parse(sessionStorage.getItem("activeStudent"));

    if (student) {
        // Vérifier les conditions de validation
        if (student.statut_ins === "inscrit" && student.moy_apprenant >= 12 && student.ps_total >= 8 && student.frais_fi >= 6000) {
            const mention = determineMention(student.moy_apprenant);
            displayMessage(
                `🎉 Votre certificat a été validé avec une mention de <strong>${mention}</strong>. Félicitations !`,
                "alert-success"
                // Télécharge son certificat donc. 
            );
        } else {
            displayMessage(
                `❌ Votre certificat ne peut pas être validé. Veuillez remplir les conditions de validation.`,
                "alert-danger"
            );
        }
    } else {
        displayMessage("Erreur : Aucune information trouvée pour l'utilisateur connecté.", "alert-danger");
    }
}

// Fonction pour déterminer la mention
function determineMention(moyenne) {
    if (moyenne >= 12 && moyenne < 14) return "Assez-bien";
    if (moyenne >= 14 && moyenne < 16) return "Bien";
    if (moyenne >= 16 && moyenne < 18) return "Très bien";
    if (moyenne >= 18) return "Excellente";
    return "Non défini";
}

// Fonction pour afficher un message avec Bootstrap
function displayMessage(message, alertClass) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

document.getElementById("logoutBtn").addEventListener("click", function () {
    // Confirmez si l'utilisateur souhaite vraiment se déconnecter
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
        // Détruire la session active
        sessionStorage.clear();

        // Rediriger vers la page d'accueil ou de connexion
        window.location.href = "../index.html"; // Remplacez par la page cible
    }
});
