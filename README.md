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

## Schritt für Schritt vorgehen
- Unter dem grünen Buttom in GitHub entweder den HTTP oder den SSH link Kopieren mit dem das Repo geklont werden kann.
- Git Bash im Ordner öffnen an welcher stelle der Klone gespeichert werden soll.
- git clone "link des remote repos"
- In das Repo Verzeichnis wechseln
- Um alle Branches zu bekommen in unserem Fall jetzt Main und Development git fetch --all ausführen.
- git switch development auf den Development branch wechseln.
- Mit git branch kann man alle verfügbare Branches zu sehen.
- git branch name erstellt einen neuen Branch der vom aktuell befindlichen Branch aus abgespaltet wird (unser vorgehen siehe oben).
- Dann wieder mit git switch auf den eigenen neuen Branch wechseln.
- Hier kann jetzt getan werden was man möchte.
- Um einen Commit auf diesen Branch hinzuzufügen müssen alle benötigten Files gestaged werden.
- Mit git add . werden alle Files gestaged um nur spezielle files zu stagen muss eben hinter git add den Filename angeben.
- Dann kann mit git commit -m "" der Commit durchgeführt werden in die Hochkommas kann die Commitmessage angegeben werden.
- Wenn die zu erledigte Aufgabe funktionfähig ist muss der Branch nun ins Remoterepo gepusht werden.
- Um den Branch zu pushen muss git push origin ausgeführt werden.
- Wenn der Branch neu ist muss git push --set-upstream origin branchname ausgeführt werden, da dass Remoterepo diesen Branch noch nicht kennt.
- Wenn man später das Lokale Repo aktualisieren möchte kann man dies mit git pull origin tun.

## Wichtige git Befehele für dieses Vorgehen 
- git clone https://github.com/Logggee/Web2Praktikum.git //Klonen des Repos auf den Lokalen Rechner
- git status //Status abfrage hier sollte stehen das ihr euch auf development oder auf eurem eigene Branch befindet
- git log oder git log --graph zeigt den Verlauf von allen Branches und Commits an mit --graph wird ein Graph ausgegeben
- git branch name //Eigenen Branch erzeugen von development aus oder noch einen unterzweig von eurem eigenen Branch aus
- git switch name //den Branch wecheseln auf den ihr commiten wollt
- git fetch origin //fetch des Repos von Github
- git pull origin //Alle neuen Daten auf das Lokale Repo laden
- git push origin //Alle neuen Daten ins Repo laden
- git add . //Alle Dateien Stagen
- git commit oder git commit -m "commit message" //commit auf den Branch machen

## Erstellen der Backend Express Anwendung
- aktuelle LTS von Node.js runterladen
- PATH variable eventuell setzten
- Im Terminal (geht auch im Terminal von Visual Studio Code) in den Ordner wechseln in dem Ordnerstrucktur enstehen soll wechseln
- nun könnte man mit npm install express alle Packeges und Dependencies installieren lassen die für express benötigt werden intallieren lassen
```shell
$ npm install express
$ npm init 
$ npm run start
```
- mit npm init kann man sich die package.json Datei erzeugen lassen.
- mit npm run start oder npm start kann die Anwendung gestertet werden.
```shell
$ npx express-generator --no-view
```
- mit diesem npx befehl kann man sich eine standart Express Ordnerstrucktur erzeugen lassen.
- ebenfalls ist nun nodemon installiert, dies bewirkt das bei Änderungen der Server nicht jedes mal neu gestartet werden muss
```shell
$ npm run dev
```
- mit diesem Befehl wird der Server im developer Modus gestartet welcher dann bei änderungen direkt von nodemon immer neu gestartet werden muss um die änderungen sehen zu können muss der Browser aber refreshed werden
- Im Browser kann man dann unter der URL http://localhost:8000/HTML/start.html die Seite Aufrufen