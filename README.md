# Casa Azzurra — Vetrina Appartamento sul Mare

Sito vetrina statico per la promozione di un appartamento al mare.

## Struttura del progetto

```
index.html        ← pagina principale
css/style.css     ← foglio di stile
js/main.js        ← interattività (lightbox, menu mobile, form)
```

## Come avviare

Apri `index.html` nel browser, oppure utilizza un server locale:

```bash
# con Python
python3 -m http.server 8000

# oppure con Node (npx)
npx serve .
```

Poi visita `http://localhost:8000`.

## Personalizzazione

I dati di contatto sono segnaposto — cerca `PLACEHOLDER` in `index.html` e sostituisci:

| Segnaposto                      | Dove                 |
| ------------------------------- | -------------------- |
| `+39 012 345 678`               | Numero di telefono   |
| `info@casaazzurra.example.com`  | Indirizzo e-mail     |
| `Via del Lungomare, 42`         | Indirizzo fisico     |
| Coordinate mappa OpenStreetMap  | Sezione "Posizione"  |

Le immagini provengono da [Unsplash](https://unsplash.com/) e possono essere sostituite con foto reali dell'immobile.