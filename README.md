# Push Notifications Presentation
## Bronnen
Can I Use: https://caniuse.com/#search=notifications
Google's officiële documentatie: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
Goede tutorial, werkte alleen niet op mac: https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679
Goede tutorial: https://medium.com/@abrar19/the-definitive-guide-to-push-notification-b2734c99e124
Push notificatie met node en serviceworkers: https://www.youtube.com/watch?v=ggUY0Q4f5ok
push notificatie met node en serviceworkers op Netlify: https://www.youtube.com/watch?v=2zHqTjyfIY8&t=318s
Push op mobile: https://www.youtube.com/watch?v=9gGp-Y4kKQ4 


## Presentatie
Open Terminal
*cd Projects > mkdir push > cd push > npm init -y > git init > npm i web-push > cd .. Ooen push -a "Visual Studio Code"*
De module web-push maakt het makkelijk om berichten te sturen en zorgt ook voor Legacy support voor oudere browsers
https://www.npmjs.com/package/web-push

Maak een index.html
Gebruik HTML boilerplate
Maak een button in de body met de tekst "Subscribe" en een onclick met subscribe()

```html
<button onclick="subscribe()">Subscribe</button>

```

We gaan nu een service worker toevoegen (Service workers zijn een manier om waarmee je functionaliteit naar het web kan brengen die je voorheen alleen in een native applicatie kon uitvoeren. Bijv. Push notificaties of periodieke background syncs https://developers.google.com/web/fundamentals/primers/service-workers ) Voeg tussen de script tags een event listener toe met addEventListener
De serviceworker komt in actie als de pagina is geladen.

Voeg daarna een console.log(sw) toe zodat je kan zien wat je precies terug krijgt

Nu gaan we een handler maken voor de subscribe button die we in de html hebben gemaakt.
Als iemand namelijk op deze knop klikt moeten we vragen of we een notificatie mogen sturen en kan je voor elkaar krijgen door een call te doen naar de push manager welke op de service worker zit.

Ik wil ook het resultaat bekijken, zo kan ik zien of de service worker wordt toegestaan of geweigerd. Dit doe ik met een console.log onder mijn functie.


```js
      addEventListener('load', async() => {
                let sw = navigator.serviceWorker.register('./sw.js');
                console.log(sw);
            })

            async function subscribe() {
                let sw = await navigator.serviceWorker.ready;
                let push = await sw.pushManager.subscribe({
                    userVisibleOnly: true, //deze hebben we altijd nodig
                    applicationServerKey: 'Todo' // deze wordt gegegenereerd door onze web push package
               })
                console.log(JSON.stringify(push)) // dit wordt normaal gesproken naar een API gestuurd
            }
```
Nu maak ik een nieuw JS bestand aan. Deze noem ik push.js
We gaan nu werken aan de server side.

Hier gaan we publieke en prive keys genereren.

```js
let push = require('web-push');

let vapidKeys = push.generateVAPIDKeys();

console.log(vapidKeys);
```

als ik nu node push.js run in mijn terminal krijg ik hier een public en een private key. ik plaats deze hierin omdat ik deze keys niet steeds opnieuw wil genereren.

```js
let push = require('web-push');

let vapidKeys = {
    publicKey: 'BLizL9sVmppO40SW0h-Y-qIOCxRyGGDtU3kv1TzpooqWrk3Qf0AncyAoAlVeD4yjnoM_zQGveCxkVUDT3k5awiA',
    privateKey: 'JWYr4VbmFQNfyDL_2Zxz4BLLxbUGYchW_FvZrJnUaYg'
}
```

Onze publickey gaat naar buiten met de webapp, dus ik plaats hem hier in onze html:

```js
let push = await sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'BLizL9sVmppO40SW0h-Y-qIOCxRyGGDtU3kv1TzpooqWrk3Qf0AncyAoAlVeD4yjnoM_zQGveCxkVUDT3k5awiA'
```

Nu gaan we in push.js onze notificatie ook echt aanmaken. Dus op push gaan we details aanpassen

```js
push.setVapidDetails('mailto:test@code.co', vapidKeys.publicKey, vapidkeys.privateKey)

let sub={hier komt onze endpoint}

push.sendNotification(sub, 'test message');
```

hier moeten we eerst een mailadres implementeren, dit kan van alles zijn. Vervolgens komt onze publickeys en als laatse onze privatekey

Het enige wat nu ontbreekt is de service worker.
We maken sw.js aan.
Voor sw.js gaan we een stuk code kopieren van Google https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

```js
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});
```
Je kan dit niet testen op localhost dus ik ga het op netflify zetten.


Ik ga eerst naar Github om mijn code op te zetten
Ik log in en maak New Repository (bijv serviceWorker)

Ik ga naar het juiste mapje in mijn terminal
ik gebruik eerst git init

Ik type in mijn terminal git remote add origin https://github.com/TimoEngelvaart/Test.git

git add .
git status
git commit -m "initial"
git push origin master -u

Ik druk op subscribe en hier krijg ik een endpoint te zien. Deze heb ik nodig. Ik kopieer deze

in de push.js stel ik het in in de 

```js
let sub = {} // ik vervang de {}
```

wanneer ik nu in mijn terminal de command *node push.js* gebruik zie ik een push notificatie
