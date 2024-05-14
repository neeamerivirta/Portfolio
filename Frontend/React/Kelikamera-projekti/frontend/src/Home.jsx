import Footer from "./Footer";
/**The frontpage component Home has visuals for banner and titles with news about the recent added features for the app */
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./src/banneri-kuva-2.png" className="Banner-image" />
        <h3>Ajankohtaiset päivitykset</h3>
        <p className="Left-align">
          <b>2.5.2024</b>
          <br></br>
          Sovellukseen on lisätty uusi ominaisuus. Nyt käyttäjälle ilmoitetaan
          mikäli reitin varrella esiintyy mustaa jäätä.
        </p>
        <p className="Left-align">
          <b>18.4.2024</b>
          <br></br>
          Sovellukseen on tullut merkittäviä päivityksiä. Nyt käyttäjämme
          pääsevät valitsemaan reitin varrelta kelikameroita, joista saa
          tarkempaa tietoa esimerkiksi tien kunnosta tai ruuhkista.
          Tämä uusi päivitys auttaa käyttäjiämme suunnittelemaan reitiinsä
          paremmin!
        </p>
        <p className="Left-align">
          <b>16.4.2024</b>
          <br></br>
          Sovelluksemme on saanut uudistetun ulkoasun!
        </p>
      </header>
      <Footer />
    </div>
  );
}

export default Home;
