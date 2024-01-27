const express = require("express");

const app = express();

/*
 * REST-Endpunkt für Berechnung Body-Mass-Index (BMI).
 * URL-Parameter:
 * * kg: Gewicht in kg
 * * cm: Körpergröße in cm
 *
 * Beispiel-URL:
 * http://localhost:8080/bmi?kg=80&cm=180
 *
 * siehe auch:
 * https://www.barmer.de/gesundheit-verstehen/leben/abnehmen-diaet/body-mass-index/bmi-rechner-1004244
 */
app.get("/bmi", (req, res) => {

    // URL-Parameter abfragen
    const kgStr = req.query.kg;
    const cmStr = req.query.cm;

    let kg = -1;
    try {
        kg = parseInt(kgStr);
    }
    catch (e) {
        console.log(`Fehler beim Parsen von URL-Parameter kg=${kgStr}: ${e}`);
        res.send("Bitte Zahl für URL-Parameter >kg< angeben");
        return;
    }

    let cm = -1;
    try {
        cm = parseInt(cmStr);
    }
    catch (e) {
        console.log(`Fehler beim Parsen von URL-Parameter cm=${cmStr}: ${e}`);
        res.send("Bitte Zahl für URL-Parameter >cm< angeben");
        return;
    }

    res.send("Noch nicht implementiert :-(");
});

const portNummer = 8080;
app.listen( 8080,
            () => { console.log(`Web-Server lauscht auf Port ${8080}`); }
          );
