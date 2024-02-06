// React-kirjaston komponenttien tuonti
import React from "react";

// Komponentti About, joka näyttää tekijän tiedot ja käyttöohjeet sovelluksesta
const About = () => {
  return (
    <section className="section">
      <h2>Info</h2>

      <h3>Tekijän tiedot</h3>
      <p>
        Neea Merivirta 22TIKOOT1 <br></br>
        Tampereen ammattikorkeakoulu, Tietojenkäsittely tutkinto-ohjelma. Kaikki
        tiedot, koodit, koodien kommentit ja tekstit ovat minun käsialaani.
      </p>
      <div className="container">
        <h3>Käyttöohjeet sovelluksesta</h3>

        <p>
          Sovellus toimii siten, että Etusivu- sivulta löytyy tekstikentät johon
          täydennetään tarvittava informaatio. Tietojen lisäämisen jälkee,
          käyttäjä painaa Lisää tehtävä- nappia. Napin painamisen jälkeen
          lisätty tehtävä tulee näkyviin.
        </p>

        <p>
          <b>Muokkaaminen</b>
        </p>
        <p>
          Jokaista tehtävää pystyy muokkaamaan. Muokkaus tapahtuu, siten että
          käyttäjä painaa Muokkaa- nappia, jonka jälkeen siirtyy muokkaamaan
          tietoja teksti laatikoissa. Muutosten jälkeen painetaan Tallenna
          muutokset- nappia. Muutokset päivittyvät tehtävälaatikossa
          automaattisesti sekä db.json tiedostossa.
        </p>

        <p>
          <b>Poistaminen</b>
        </p>

        <p>
          Käyttäjä pystyy poistamaan tehtäviä pois painamalla Poista- nappia.
          Napin painamisen jälkeen kyseinen tehtävä poistuu näkyvistä sekä
          db.json tiedostosta. Käyttäjä ei pysty palauttamaan poistettuja
          tehtäviä enää jälkikäteen.
        </p>

        <p>
          <b>Muuta</b>
        </p>

        <p>
          Käyttäjä pääsee näkemään Muuta- sivulta pylväsdiagrammin, jossa näkyy
          tehtävien tagit sekä kyseisten tagien lukumäärän. Asetukset- sivulta
          pystyy vaihtamaan väri teemaa tumman ja vaalean välillä.
        </p>

        <div>
          <br></br>
          <h3>Projektityön tekijän kommentit</h3>
          <p>
            React-projekti oli itselleni hieman haastava ja aikaa sain kulumaan
            koko projektiin lähemmäs 60h. Suurimpana haasteena oli kokonaisuuden
            hahmottaminen eli minkälainen sovellus käytännössä tulisi olla.
            Jonkinlainen malli esimerkki olisi ollut erittäin hyödyllinen
            itselleni, jotta olisin hahmottanut itse mitä projektilla haetaan.
            Myös lievän lukihäiriön omaavana Word-tiedoston ohjeet olivat liian
            pitkät ja monimutkaiset luettavaksi. Muutamia kohtia olisi voinut
            pilkkoa pienemmiksi osiksi esimerkiksi H ja I -kohdat. Rehellisesti
            sanottuna olen hieman pettynyt itseeni etten saanut läheskään
            kaikkia komponentteja tehtyä ja sovellusta toimimaan haluamallani
            tavalla.
          </p>

          <p>
            Haastavimpana ominaisuuten projektin kanssa oli luoda
            pylväsdiagrammi jossa käyttäjä voi itse validoita mikä/mitkä tagit
            näkyvät kaaviossa. (Mikäli siis ymmärsin, että näin kuului toimia.
            Myös tagien järjestelyt tuntuivat haastavalta).
          </p>

          <p>
            Työläin sekä haastava osuus oli tehtävien ajastaminen, eli kun
            käyttäjä painaa Aktiivinen -nappia olisi ajastin lähtenyt
            automaattisesti käyntiin ja käytetty aika olisi näkynyt tehtävä
            ruudussa. Tätä en saanut tehtyä.
          </p>
        </div>
      </div>

      <br></br>
      <p>React projekti 2023, ©Neea Merivirta</p>
    </section>
  );
};

export default About;
