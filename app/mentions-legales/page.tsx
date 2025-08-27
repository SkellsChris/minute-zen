import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Mentions légales – MinuteZen',
}

export default function MentionsLegales() {
  return (
    <>
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 prose">
        <h1>📄 Mentions légales – MinuteZen</h1>
        <section>
          <h2>Éditeur du site</h2>
          <p>
            MinuteZen est édité par :<br />
            BC STRATEGIC SERVICES LLC<br />
            2915 Ogletown Rd, Newark, DE 19713, USA<br />
            Responsable de la publication : Christopher Bouché<br />
            📧 Contact : <a href="mailto:contact@minutezen.fr">contact@minutezen.fr</a>
          </p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>
            Le site MinuteZen est hébergé par :<br />
            Vercel Inc.<br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789, États-Unis<br />
            🌐 <a href="https://vercel.com">https://vercel.com</a>
          </p>
        </section>
        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu (textes, images, graphismes, logo) présent sur ce site est la propriété exclusive de MinuteZen, sauf mention contraire.
            Toute reproduction, diffusion, modification, adaptation, totale ou partielle, sans autorisation préalable est interdite.
          </p>
        </section>
        <section>
          <h2>Responsabilité</h2>
          <p>
            Les informations fournies sur MinuteZen sont données à titre informatif et ne remplacent en aucun cas un avis médical, psychologique ou thérapeutique.
            L’utilisateur reste seul responsable de l’usage qu’il fait des informations et exercices proposés sur le site.
          </p>
        </section>
        <section>
          <h2>Données personnelles</h2>
          <p>
            <strong>Données collectées :</strong> prénom, email (via formulaire d’inscription newsletter / téléchargement).
          </p>
          <p>
            <strong>Finalité :</strong> envoi d’informations et de ressources liées au bien-être et à la relaxation.
          </p>
          <p>
            <strong>Conservation :</strong> maximum 1 an après la dernière interaction.
          </p>
          <p>
            <strong>Droit d’accès, de rectification et de suppression :</strong> vous pouvez exercer vos droits en écrivant à <a href="mailto:contact@minutezen.fr">contact@minutezen.fr</a>.
          </p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>
            Le site utilise des cookies techniques nécessaires à son fonctionnement.<br />
            Des cookies analytiques peuvent être utilisés pour améliorer l’expérience utilisateur.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
