// Base de données des documents
const documents = [
    {
        titre: "Guide du nouvel étudiant à Tokat",
        categorie: "admin",
        date: "2026-04-20",
        lien: "#",
        type: "PDF",
        description: "Toutes les démarches pour bien commencer"
    },
    {
        titre: "Cours de Mathématiques - Semestre 1",
        categorie: "cours",
        date: "2026-04-15",
        lien: "#",
        type: "PDF",
        matiere: "Maths"
    },
    {
        titre: "Annales Examens Droit 2025",
        categorie: "annales",
        date: "2026-04-10",
        lien: "#",
        type: "PDF",
        annee: "2025"
    },
    {
        titre: "Procédure renouvellement titre de séjour",
        categorie: "admin",
        date: "2026-04-05",
        lien: "#",
        type: "DOC",
        important: true
    },
    {
        titre: "Cours de Programmation Java",
        categorie: "cours",
        date: "2026-04-01",
        lien: "#",
        type: "PDF",
        matiere: "Informatique"
    }
];

// Afficher les derniers documents sur l'accueil
function afficherDerniersDocuments() {
    const liste = document.getElementById('document-list');
    if (!liste) return;
    
    if (documents.length === 0) {
        liste.innerHTML = '<li>Aucun document disponible pour le moment.</li>';
        return;
    }
    
    liste.innerHTML = documents.slice(0, 5).map(doc => `
        <li>
            <strong>${doc.titre}</strong>
            <br>
            <small>
                📅 ${formatDate(doc.date)} | 
                📄 ${doc.type} | 
                📁 ${getCategoryLabel(doc.categorie)}
                ${doc.important ? ' ⭐ Important' : ''}
            </small>
            <br>
            <a href="${doc.lien}" class="download-link" target="_blank">📥 Télécharger</a>
        </li>
    `).join('');
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

// Libellé des catégories
function getCategoryLabel(categorie) {
    const labels = {
        'cours': 'Cours',
        'annales': 'Annales',
        'admin': 'Administratif'
    };
    return labels[categorie] || categorie;
}

// Filtrer les documents par catégorie
function filterDocuments(categorie, containerId) {
    const filtered = documents.filter(doc => doc.categorie === categorie);
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>Aucun document dans cette catégorie.</p>';
        return;
    }
    
    container.innerHTML = filtered.map(doc => `
        <div class="document-card">
            <h3>${doc.titre}</h3>
            <p><small>📅 ${formatDate(doc.date)} | 📄 ${doc.type}</small></p>
            ${doc.description ? `<p>${doc.description}</p>` : ''}
            <a href="${doc.lien}" class="download-link" target="_blank">📥 Télécharger le document</a>
        </div>
    `).join('');
}

// Fonction pour la recherche
function searchDocuments(keyword) {
    if (!keyword) return documents;
    
    return documents.filter(doc => 
        doc.titre.toLowerCase().includes(keyword.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(keyword.toLowerCase()))
    );
}

// Charger les cours par matière
function loadCourses() {
    const courses = documents.filter(d => d.categorie === 'cours');
    const container = document.getElementById('courses-list');
    
    if (!container) return;
    
    // Grouper par matière
    const bySubject = {};
    courses.forEach(course => {
        const subject = course.matiere || 'Divers';
        if (!bySubject[subject]) bySubject[subject] = [];
        bySubject[subject].push(course);
    });
    
    container.innerHTML = Object.keys(bySubject).map(subject => `
        <div class="course-category">
            <h3>📖 ${subject}</h3>
            ${bySubject[subject].map(course => `
                <div class="course-card">
                    <strong>${course.titre}</strong>
                    <br>
                    <small>📅 ${formatDate(course.date)}</small>
                    <br>
                    <a href="${course.lien}" class="download-link">Télécharger</a>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    afficherDerniersDocuments();
    
    // Charger les cours si on est sur la page cours
    if (window.location.pathname.includes('cours.html')) {
        loadCourses();
    }
    
    // Charger les annales si on est sur la page annales
    if (window.location.pathname.includes('annales.html')) {
        filterDocuments('annales', 'annales-list');
    }
    
    // Charger les démarches si on est sur la page admin
    if (window.location.pathname.includes('admin.html')) {
        filterDocuments('admin', 'admin-list');
    }
});
