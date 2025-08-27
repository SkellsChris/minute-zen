import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Politique de confidentialité – MinuteZen',
}

export default function PolitiqueConfidentialite() {
  return (
    <>
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 prose">
        <h1>Politique de confidentialité – MinuteZen</h1>
        <section>
          <h2>1. Introduction</h2>
          <p>
            La présente Politique de confidentialité a pour objectif d’informer les utilisateurs du site MinuteZen.fr de la manière dont leurs données personnelles sont collectées, utilisées et protégées. En utilisant ce site, vous acceptez cette politique.
          </p>
        </section>
        <section>
          <h2>2. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est :<br />
            BC STRATEGIC SERVICES LLC<br />
            2915 Ogletown Rd, Newark, DE 19713, USA<br />
            📧 <a href="mailto:contact@minutezen.fr">contact@minutezen.fr</a>
          </p>
        </section>
        <section>
          <h2>3. Données collectées</h2>
          <p>Nous pouvons collecter les informations suivantes :</p>
          <ul>
            <li>Nom et prénom (si fournis volontairement)</li>
            <li>Adresse email (lors d’une inscription à la newsletter ou au téléchargement d’une ressource)</li>
            <li>Données de navigation (cookies analytiques, pages visitées, temps de visite, adresse IP partielle)</li>
          </ul>
        </section>
        <section>
          <h2>4. Finalités du traitement</h2>
          <p>Vos données sont collectées afin de :</p>
          <ul>
            <li>Envoyer la newsletter MinuteZen et des contenus liés à la relaxation et au bien-être</li>
            <li>Fournir l’accès à des ressources gratuites (PDF, audios, etc.)</li>
            <li>Analyser la fréquentation du site pour améliorer l’expérience utilisateur</li>
          </ul>
        </section>
        <section>
          <h2>5. Partage des données</h2>
          <p>
            Vos données ne sont jamais vendues.<br />
            Elles peuvent être partagées uniquement avec nos prestataires techniques (hébergeur, outil d’emailing tel que Brevo ou équivalent).
          </p>
        </section>
        <section>
          <h2>6. Durée de conservation</h2>
          <ul>
            <li>Email et prénom : jusqu’à 1 an après la dernière interaction</li>
            <li>Cookies analytiques : maximum 13 mois</li>
          </ul>
        </section>
        <section>
          <h2>7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d’accès à vos données</li>
            <li>Droit de rectification et de suppression</li>
            <li>Droit d’opposition au traitement (désinscription newsletter possible à tout moment)</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p>
            Pour exercer vos droits : <a href="mailto:contact@minutezen.fr">contact@minutezen.fr</a>
          </p>
        </section>
        <section>
          <h2>8. Cookies</h2>
          <p>Le site utilise :</p>
          <ul>
            <li>Des cookies techniques indispensables au bon fonctionnement</li>
            <li>Des cookies analytiques (Google Analytics ou équivalent) pour mesurer l’audience</li>
          </ul>
          <p>Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
        </section>
        <section>
          <h2>9. Sécurité</h2>
          <p>Nous mettons en place toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données contre la perte, l’accès non autorisé ou la divulgation.</p>
        </section>
        <section>
          <h2>10. Modifications</h2>
          <p>
            La présente politique peut être mise à jour à tout moment.<br />
            Dernière mise à jour : 27/08/2025.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
