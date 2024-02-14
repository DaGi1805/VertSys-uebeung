const express = require("express");

const app = express();

const PORT_NUMMER = 8080;

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_OK          = 200;

/*
 * REST-Endpunkt für Berechnung Body-Mass-Index (BMI).
 * URL-Parameter:
 * * kg: Gewicht in kg
 * * cm: Körpergröße in cm
 *
 * Beispiel-URL für Aufruf:
 * http://localhost:8080/bmi?kg=80&cm=180
 *
 * Rückgabe:
 * * HTTP-Status-Code 400 (Bad Request) bei fehlerhaften URL-Parametern
 * * HTTP-Status-Code 200 (OK) bei erfolgreicher Berechnung
 *
 * Erklärung "Body Mass Index" (BMI) und Interpretation der Werte, siehe z.B. hier:
 * https://www.barmer.de/gesundheit-verstehen/leben/abnehmen-diaet/body-mass-index/bmi-rechner-1004244
 */
app.get("/bmi", (req, res) => {

    // überprüfen, ob URL-Parameter vorhanden sind
    const kgStr = req.query.kg;
    const cmStr = req.query.cm;

    if (kgStr === undefined) {

        res.status(HTTP_STATUS_BAD_REQUEST)
           .json({ erfolg   : false,
                   nachricht: "Bitte URL-Parameter >kg< angeben." });
        return;
    }
    if (cmStr === undefined) {

        res.status(HTTP_STATUS_BAD_REQUEST)
            .json({ erfolg   : false,
                    nachricht: "Bitte URL-Parameter >cm< angeben." });
        return;
    }

    const kg = parseInt(kgStr);
    if (isNaN(kg)) {

        res.status(HTTP_STATUS_BAD_REQUEST)
           .json({ erfolg   : false,
                   nachricht: `Wert "${kgStr}" für URL-Parameter >kg< ist keine Zahl.` });
        return;
    }
    const cm = parseInt(cmStr);
    if (isNaN(cm)) {

        res.status(HTTP_STATUS_BAD_REQUEST)
           .json({ erfolg   : false,
                   nachricht: `Wert "${cmStr}" für URL-Parameter >cm< ist keine Zahl.` });
        return;
    }

    // eigentliche Berechnung
    let bmi = kg / (cm * cm) * 10000; // *10.000 wegen cm statt m

    // auf eine Nachkommastelle runden
    bmi = Math.round(bmi * 10) / 10;

    let interpretation = "";
    if      (bmi < 18.5) { interpretation = "Untergewicht";        }
    else if (bmi < 25.0) { interpretation = "Normalgewicht";       }
    else if (bmi < 30.0) { interpretation = "Prä-Adipositas";      }
    else if (bmi < 35.0) { interpretation = "Moderate Adipositas"; }
    else if (bmi < 40.0) { interpretation = "Starke Adipositas";   }
    else                 { interpretation = "Extreme Adipositas";  }

    res.status(HTTP_STATUS_OK)
       .json({ erfolg   : true,
               bmi      : bmi,
               nachricht: interpretation });

});


// statische Dateien (z.B. "index.html") aus Unterordner "public/" bereitstellen
app.use( express.static("public") );

// Web-Server starten
app.listen( PORT_NUMMER,
            () => { console.log(`Web-Server auf Port ${PORT_NUMMER} gestartet.`); }
          );
