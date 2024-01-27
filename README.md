# REST-API "Body Mass Index (BMI)" mit Nodejs+Express #

<br>

Beispiel für Abfrage für 80kg Körpergewicht und 190cm Körpergröße: http://localhost:8080/bmi?kg=80&cm=190
```
{
  "erfolg"   : true,
  "bmi"      : 22.2,
  "nachricht": "Normalgewicht"
}
```

<br>

Beispiel für Abfrage mit fehlender Körpergröße: http://localhost:8080/bmi?kg=80
```
{
  "erfolg"   : false,
  "nachricht": "Bitte URL-Parameter >cm< angeben"
}
```

<br>

Beispiel für Abfrage mit fehlender Körpergröße: http://localhost:8080/bmi?kg=80&cm=asdf
```
{
  "erfolg": false,
  "nachricht": "Wert \"asdf\" für URL-Parameter >cm< ist keine int-Zahl."
}
```

<br>
