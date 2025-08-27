import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Politique relative aux cookies – MinuteZen',
}

export default function PolitiqueCookies() {
  return (
    <>
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 prose">
        <h1>Politique relative aux cookies – MinuteZen</h1>
        <section>
          <h2>1. Qu’est-ce qu’un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur,
            smartphone, tablette) lorsque vous visitez un site internet.
          </p>
          <p>
            Ils permettent de stocker des informations relatives à votre navigation afin
            d’améliorer votre expérience utilisateur et de mesurer l’audience du site.
          </p>
        </section>
        <section>
          <h2>2. Types de cookies utilisés sur MinuteZen</h2>
          <p>Nous utilisons les catégories suivantes de cookies :</p>
          <h3>Cookies techniques (indispensables)</h3>
          <p>
            Ces cookies sont nécessaires au bon fonctionnement du site (navigation,
            sécurité, affichage). Vous ne pouvez pas les désactiver.
          </p>
          <h3>Cookies analytiques (statistiques)</h3>
          <p>
            Ces cookies nous permettent de mesurer la fréquentation du site et d’améliorer
            son contenu. Exemple : Google Analytics ou outil équivalent.
          </p>
          <h3>Cookies tiers (optionnels)</h3>
          <p>
            Dans certains cas, des cookies peuvent être déposés par des services externes
            (par ex. vidéos YouTube intégrées, boutons de partage réseaux sociaux).
          </p>
        </section>
        <section>
          <h2>3. Consentement et gestion des cookies</h2>
          <p>
            Lors de votre première visite sur MinuteZen, un bandeau d’information vous
            permet d’accepter ou de refuser les cookies non essentiels.
          </p>
          <p>Vous pouvez à tout moment :</p>
          <ul>
            <li>Retirer votre consentement</li>
            <li>Paramétrer vos choix via le bandeau cookies</li>
            <li>
              Configurer votre navigateur pour bloquer ou supprimer les cookies déjà
              enregistrés
            </li>
          </ul>
          <p>Pour en savoir plus, consultez la section d’aide de votre navigateur :</p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647">Chrome</a>
            </li>
            <li>
              <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent">Firefox</a>
            </li>
            <li>
              <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac">Safari</a>
            </li>
            <li>
              <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">Edge</a>
            </li>
          </ul>
        </section>
        <section>
          <h2>4. Durée de conservation</h2>
          <p>
            <strong>Cookies techniques :</strong> durée limitée à la session de navigation
          </p>
          <p>
            <strong>Cookies analytiques :</strong> maximum 13 mois
          </p>
        </section>
        <section>
          <h2>5. Contact</h2>
          <p>
            Pour toute question relative à notre politique cookies, vous pouvez nous écrire
            à :<br />📧{' '}
            <a href="mailto:contact@minutezen.fr">contact@minutezen.fr</a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

