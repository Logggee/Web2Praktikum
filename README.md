# Web2Praktikum
Webseite für Webanwendungen 2 Praktikum Sommersemester 2023

## Regeln wie wir mit Branches umgehen
- Der Hauptzweig ist Main in diesen werden nur durch Pull Request und der Bestätigung von mir Merges durchgeführt
- Vom Zweig Development aus muss jeder seinen eigenen Branch aus abzweigen für seine zugewießene Aufgabe
- Wenn die Aufgabe erfüllt wurde kann der Branch in den Development Branch via Pull Request gemerged werden
- Wenn Wir z.B die Abgabe für den HTML CSS Prototypen abgeben müssen und dieser Final ist wird der Development Branch an dieser Stelle in den Main Branch überführt
- Das Vormat der eigenen Branches soll euer name und dann in Klammer was ihr auf dem Branch entwickelt habt sein z.B jan(Nabar and Footer)
- Bitte keinen Merge Lokal in Main oder Development machen immer über Pull Request (sollte aber eigentlich sowieso nciht anders möglich sein)
- Wenn ein Branch Gemerged wurde wird der Branch automatisch gelöscht kann aber auch wieder regeneriert werden im Notfall
- Commit immer dann wenn ein gewisser fortschritt festgehalten werden soll der z.B Stabil läuft
- Commit Messages und Branch Name auf Englisch 

## Wichtige git Befehele für dieses Vorgehen 
- git clone https://github.com/Logggee/Web2Praktikum.git //Klonen des Repos auf den Lokalen Rechner
- git status //Status abfrage hier sollte stehen das ihr euch auf development oder auf eurem eigene Branch befindet
- git branch name //Eigenen Branch erzeugen von development aus oder noch einen unterzweig von eurem eigenen Branch aus
- git switch name //den Branch wecheseln auf den ihr commiten wollt
- git fetch origin //fetch des Repos von Github
- git pull origin //Alle neuen Daten auf das Lokale Repo laden
- git push origin //Alle neuen Daten ins Repo laden
- git add . //Alle Dateien Stagen
- git commit oder git commit -m "commit message" //commit auf den Branch machen
